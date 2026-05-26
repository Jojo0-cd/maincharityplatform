'use client';

import { useState, useEffect } from 'react';
import TransactionReceipt from './TransactionReceipt';

function triggerDonationSuccess() {}

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
  const [currency, setCurrency] = useState<Currency>('ETH');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string; txHash?: string }>({ type: 'idle', message: '' });

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

      // 2. SUCCESS: Fire the confetti + show the receipt!
      triggerDonationSuccess(); 
      setStatus({ type: 'success', message: 'Donation successful! Thank you.', txHash });
      
    } catch (error: unknown) {
      const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as { code?: number }).code : undefined;
      if (errorCode === 4001) setStatus({ type: 'error', message: 'Transaction rejected in wallet.' });
      else setStatus({ type: 'error', message: 'Transaction failed. Check console.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl text-white relative">
        
        {status.type === 'success' && status.txHash ? (
          <TransactionReceipt 
            txHash={status.txHash} 
            amount={amount} 
            campaignName={campaignName} 
            onClose={onClose} 
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Fund: {campaignName}</h2>
              <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors text-2xl font-bold">&times;</button>
            </div>

            <div className="flex p-1 mb-6 bg-zinc-800 rounded-lg">
              <button onClick={() => setCurrency('ETH')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${currency === 'ETH' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}>Ethereum</button>
              <button onClick={() => setCurrency('USDC')} className="flex-1 py-2 text-sm font-medium rounded-md text-zinc-600 cursor-not-allowed">USDC (Soon)</button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Amount (ETH)</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-4 text-2xl outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {status.type === 'error' && (
              <div className="mb-4 p-3 rounded-md text-sm text-center bg-red-900/50 text-red-400 border border-red-800">
                <p className="font-semibold">{status.message}</p>
              </div>
            )}

            <button
              onClick={handleDonate}
              disabled={!amount || isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                !amount || isProcessing 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-zinc-200 hover:scale-[1.02]'
              }`}
            >
              {isProcessing ? 'Confirming in Wallet...' : 'Confirm Transaction'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}