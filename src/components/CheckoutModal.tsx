'use client';

import { useState, useEffect } from 'react';

// Keep your amazing Hex/Wei converter!
function toHexWei(amount: string) {
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) throw new Error("Invalid amount");
  const parts = amount.split(".");
  const integerPart = parts[0] || "0";
  const fractionPart = parts[1] || "";
  const paddedFraction = (fractionPart + "0".repeat(18)).slice(0, 18);
  return `0x${BigInt(integerPart + paddedFraction).toString(16)}`;
}

type Currency = 'USDC' | 'ETH';

export default function CheckoutModal({ 
  campaignName, 
  campaignWalletAddress, 
  onClose 
}: { 
  campaignName: string, 
  campaignWalletAddress: string, 
  onClose: () => void 
}) {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>('ETH'); // Default to ETH for now since your backend is set up for it
  const [isProcessing, setIsProcessing] = useState(false);
  const [gasEstimate, setGasEstimate] = useState<number>(0);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string; txHash?: string }>({ type: 'idle', message: '' });

  // Mock gas estimation
  useEffect(() => {
    const fetchGas = () => {
      const mockGas = currency === 'ETH' ? 0.002 : 1.5; 
      setGasEstimate(mockGas);
    };
    fetchGas();
  }, [currency]);

  // YOUR MetaMask logic, injected into the modal!
  const handleDonate = async () => {
    if (!amount || Number(amount) <= 0) return;
    setStatus({ type: 'idle', message: '' });
    
    type EthereumProvider = { request: (args: { method: string; params?: unknown }) => Promise<unknown> };
    const ethereum = (window as unknown as { ethereum?: EthereumProvider }).ethereum;

    if (!ethereum) {
      setStatus({ type: 'error', message: 'No crypto wallet found. Please install MetaMask.' });
      return;
    }

    try {
      setIsProcessing(true);
      const accounts = (await ethereum.request({ method: "eth_requestAccounts" })) as string[];
      if (!accounts || accounts.length === 0) throw new Error("No accounts connected.");

      const txHash = (await ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: accounts[0], to: campaignWalletAddress, value: toHexWei(amount) }],
      })) as string;

      setStatus({ type: 'success', message: 'Donation successful! Thank you.', txHash });
    } catch (error: unknown) {
      const errorCode =
        typeof error === 'object' && error !== null && 'code' in error
          ? (error as { code?: number }).code
          : undefined;

      if (errorCode === 4001) setStatus({ type: 'error', message: 'Transaction rejected in wallet.' });
      else setStatus({ type: 'error', message: 'Transaction failed. Check console.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl text-white relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Fund: {campaignName}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors text-2xl font-bold">
            &times;
          </button>
        </div>

        {/* Currency Toggle (Visual only for now until you add USDC logic) */}
        <div className="flex p-1 mb-6 bg-zinc-800 rounded-lg">
          <button
            onClick={() => setCurrency('ETH')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              currency === 'ETH' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ethereum
          </button>
          <button
            onClick={() => setCurrency('USDC')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              currency === 'USDC' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            USDC (Coming Soon)
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-2">Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-4 text-2xl outline-none focus:border-blue-500 transition-colors"
            />
            <span className="absolute right-4 top-3.5 text-zinc-500 font-medium">
              {currency}
            </span>
          </div>
        </div>

        {/* Receipt Breakdown */}
        <div className="mb-8 space-y-3 text-sm">
          <div className="flex justify-between text-zinc-400">
            <span>Network Fee (Est. Gas)</span>
            <span>~ {gasEstimate} {currency}</span>
          </div>
          <div className="flex justify-between font-medium text-white pt-3 border-t border-zinc-800">
            <span>Total</span>
            <span>
              {amount ? (parseFloat(amount) + gasEstimate).toFixed(4) : '0.00'} {currency}
            </span>
          </div>
        </div>

        {/* Status Messages */}
        {status.message && (
          <div className={`mb-4 p-3 rounded-md text-sm text-center ${status.type === 'success' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
            <p className="font-semibold">{status.message}</p>
            {status.txHash && (
              <a href={`https://sepolia.etherscan.io/tx/${status.txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-1 inline-block">
                View on Etherscan &rarr;
              </a>
            )}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleDonate}
          disabled={!amount || isProcessing || currency === 'USDC'}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            !amount || isProcessing || currency === 'USDC'
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-zinc-200 hover:scale-[1.02]'
          }`}
        >
          {isProcessing ? 'Confirming in Wallet...' : 'Confirm Transaction'}
        </button>
        
      </div>
    </div>
  );
}
