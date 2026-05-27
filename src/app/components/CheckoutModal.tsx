'use client';

import { useState } from 'react';
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

type Currency = 'ETH' | 'BNB' | 'BTC';

// Define the networks so MetaMask knows exactly what to switch to or add
const NETWORKS = {
  ETH: {
    chainId: '0x1', // Ethereum Mainnet
    chainName: 'Ethereum Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://cloudflare-eth.com'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  BNB: {
    chainId: '0x38', // BSC Mainnet
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: { name: 'Binance Coin', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com']
  }
};

export default function CheckoutModal({ 
  campaignName, 
  ethAddress,
  bnbAddress,
  btcAddress,
  onClose 
}: { 
  campaignName: string, 
  ethAddress: string,
  bnbAddress: string,
  btcAddress: string,
  onClose: () => void 
}) {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>('ETH');
  const [isProcessing, setIsProcessing] = useState(false);
  const [gasEstimate, setGasEstimate] = useState<number>(0.002);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error' | 'info'; message: string; txHash?: string }>({ type: 'idle', message: '' });

  const handleTabChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    setStatus({ type: 'idle', message: '' });
    if (newCurrency === 'ETH') setGasEstimate(0.002);
    else if (newCurrency === 'BNB') setGasEstimate(0.0005);
    else setGasEstimate(0);
  };

  const handleAction = async () => {
    // 1. Handle BTC (Manual Copy)
    if (currency === 'BTC') {
      navigator.clipboard.writeText(btcAddress);
      setStatus({ type: 'info', message: 'BTC Address copied! Please send from your Bitcoin wallet.' });
      return;
    }

    // 2. Handle EVM (ETH/BNB via MetaMask)
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

      // --- NEW: AUTOMATIC NETWORK SWITCHING ---
      const targetNetwork = currency === 'ETH' ? NETWORKS.ETH : NETWORKS.BNB;
      const currentChainId = (await ethereum.request({ method: 'eth_chainId' })) as string;

      if (currentChainId !== targetNetwork.chainId) {
        setStatus({ type: 'info', message: `Switching wallet to ${currency} network...` });
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetNetwork.chainId }],
          });
        } catch (switchError: unknown) {
          const code = (switchError as { code?: number }).code;
          // Error 4902 means the user doesn't have this network added to their MetaMask yet
          if (code === 4902) {
            setStatus({ type: 'info', message: `Adding ${currency} network to wallet...` });
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [targetNetwork],
            });
          } else {
            throw new Error("Network switch rejected by user.");
          }
        }
      }

      setStatus({ type: 'info', message: 'Please confirm the transaction...' });

      // Request Accounts & Send Transaction
      const accounts = (await ethereum.request({ method: "eth_requestAccounts" })) as string[];
      if (!accounts || accounts.length === 0) throw new Error("No accounts connected.");

      const targetAddress = currency === 'ETH' ? ethAddress : bnbAddress;

      const txHash = (await ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: accounts[0], to: targetAddress, value: toHexWei(amount) }],
      })) as string;

      // SUCCESS
      triggerDonationSuccess(); 
      setStatus({ type: 'success', message: 'Donation successful! Thank you.', txHash });
      
    } catch (error: unknown) {
      const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as { code?: number }).code : undefined;
      if (errorCode === 4001) setStatus({ type: 'error', message: 'Request rejected in wallet.' });
      else setStatus({ type: 'error', message: 'Transaction failed or network switch aborted.' });
      console.error(error);
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
            currency={currency} 
            onClose={onClose} 
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Fund: {campaignName}</h2>
              <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors text-2xl font-bold">&times;</button>
            </div>

            <div className="flex p-1 mb-6 bg-zinc-800 rounded-lg">
              <button onClick={() => handleTabChange('ETH')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${currency === 'ETH' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}>ETH</button>
              <button onClick={() => handleTabChange('BNB')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${currency === 'BNB' ? 'bg-[#F3BA2F] text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}>BNB</button>
              <button onClick={() => handleTabChange('BTC')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${currency === 'BTC' ? 'bg-[#F7931A] text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}>BTC</button>
            </div>

            {currency !== 'BTC' ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Amount ({currency})</label>
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
              </>
            ) : (
              <div className="mb-8 p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-center break-all">
                <p className="text-zinc-400 text-sm mb-2">Send Bitcoin directly to:</p>
                <code className="text-sm font-mono text-[#F7931A] block mb-2">{btcAddress || "Address not provided"}</code>
              </div>
            )}

            {(status.type === 'error' || status.type === 'info') && (
              <div className={`mb-4 p-3 rounded-md text-sm text-center ${status.type === 'info' ? 'bg-blue-900/50 text-blue-400 border border-blue-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
                <p className="font-semibold">{status.message}</p>
              </div>
            )}

            <button
              onClick={handleAction}
              disabled={currency !== 'BTC' && (!amount || isProcessing)}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                currency !== 'BTC' && (!amount || isProcessing)
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-zinc-200 hover:scale-[1.02]'
              }`}
            >
              {isProcessing ? 'Waiting on Wallet...' : currency === 'BTC' ? 'Copy BTC Address' : 'Confirm Transaction'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}