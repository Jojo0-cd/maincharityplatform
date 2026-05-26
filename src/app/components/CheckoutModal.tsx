'use client';

import { useState, useEffect } from 'react';

type Currency = 'USDC' | 'ETH';

export default function CheckoutModal({ campaignName, onClose }: { campaignName: string, onClose: () => void }) {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>('USDC');
  const [isProcessing, setIsProcessing] = useState(false);
  const [gasEstimate, setGasEstimate] = useState<number>(0);

  // Mock gas estimation - this updates when currency changes
  useEffect(() => {
    // In production, this would be an ethers.js getFeeData() call
    const fetchGas = () => {
      const mockGas = currency === 'ETH' ? 0.002 : 1.5; // ETH uses ETH, USDC uses USDC for display purposes here
      setGasEstimate(mockGas);
    };
    fetchGas();
  }, [currency]);

  const handleDonate = async () => {
    setIsProcessing(true);
    // Simulate MetaMask interaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert(`Success! Simulated donation to ${campaignName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl text-white">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Fund this Block</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        {/* Currency Toggle */}
        <div className="flex p-1 mb-6 bg-zinc-800 rounded-lg">
          <button
            onClick={() => setCurrency('USDC')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              currency === 'USDC' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            USDC
          </button>
          <button
            onClick={() => setCurrency('ETH')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              currency === 'ETH' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ethereum
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

        {/* Action Button */}
        <button
          onClick={handleDonate}
          disabled={!amount || isProcessing}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            !amount || isProcessing 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-zinc-200 hover:scale-[1.02]'
          }`}
        >
          {isProcessing ? 'Awaiting MetaMask...' : 'Confirm Transaction'}
        </button>
        
      </div>
    </div>
  );
}
