"use client";

import { useState, use } from "react";
import Link from "next/link";
// Import the mock data directly from your homepage
import { campaigns } from "../../page"; 

function toHexWei(amount: string) {
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) throw new Error("Invalid amount");
  const parts = amount.split(".");
  const integerPart = parts[0] || "0";
  const fractionPart = parts[1] || "";
  const paddedFraction = (fractionPart + "0".repeat(18)).slice(0, 18);
  return `0x${BigInt(integerPart + paddedFraction).toString(16)}`;
}

type CryptoDonationButtonProps = { campaignWalletAddress: string; donationAmount: string; };

function CryptoDonationButton({ campaignWalletAddress, donationAmount }: CryptoDonationButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string; txHash?: string }>({ type: 'idle', message: '' });

  const handleDonate = async () => {
    if (!donationAmount || Number(donationAmount) <= 0) return;
    setStatus({ type: 'idle', message: '' });
    
    type EthereumProvider = { request: (args: { method: string; params?: unknown }) => Promise<unknown> };
    const ethereum = (window as unknown as { ethereum?: EthereumProvider }).ethereum;

    if (!ethereum) {
      setStatus({ type: 'error', message: 'No crypto wallet found. Please install MetaMask.' });
      return;
    }

    try {
      setIsPending(true);
      const accounts = (await ethereum.request({ method: "eth_requestAccounts" })) as string[];
      if (!accounts || accounts.length === 0) throw new Error("No accounts connected.");

      const txHash = (await ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: accounts[0], to: campaignWalletAddress, value: toHexWei(donationAmount) }],
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
      setIsPending(false);
    }
  };

  const isDisabled = !donationAmount || Number(donationAmount) <= 0 || isPending;

  return (
    <div className="w-full mt-4">
      <button
        onClick={handleDonate}
        disabled={isDisabled}
        className={`w-full py-3 rounded-md text-lg font-semibold transition text-white ${
          isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isPending ? 'Confirming in Wallet...' : 'Donate with Crypto'}
      </button>
      
      {status.message && (
        <div className={`mt-3 p-3 rounded-md text-sm text-center ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800'}`}>
          <p className="font-semibold">{status.message}</p>
          {status.txHash && (
            <a href={`https://sepolia.etherscan.io/tx/${status.txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-1 inline-block">
              View receipt on Etherscan &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  const [amount, setAmount] = useState("");
  
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black">
        <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Homepage
        </Link>
      </div>
    );
  }

  const progressPercentage = Math.min((campaign.currentRaised / campaign.goalAmount) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 text-black">
      <div className="max-w-2xl mx-auto">
        
        <Link href="/" className="text-gray-500 hover:text-black mb-8 inline-block transition-colors">
          &larr; Back to all campaigns
        </Link>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100">
          <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
          <p className="text-gray-600 text-lg mb-8">{campaign.description}</p>

          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex justify-between text-sm mb-2 font-semibold">
              <span className="text-blue-600">{campaign.currentRaised} ETH Raised</span>
              <span className="text-gray-500">Goal: {campaign.goalAmount} ETH</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            {/* Added a visual indicator so users can see the specific wallet address */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Campaign Wallet</p>
              <p className="text-sm font-mono text-gray-700 bg-gray-100 p-2 rounded break-all">
                {campaign.walletAddress}
              </p>
            </div>
          </div>

          <hr className="border-gray-200 mb-8" />

          <div>
            <label className="text-xl font-bold mb-3 block">
              Make a Donation (ETH)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00" 
              className="w-full bg-white text-black placeholder-gray-400 border-2 border-gray-300 p-4 rounded-xl text-xl focus:outline-none focus:border-blue-500 transition-colors"
              min="0.01"
              step="0.01" 
            />

            {/* 🔥 MAGIC HAPPENS HERE: We pass the specific campaign's address into the button */}
            <CryptoDonationButton 
              campaignWalletAddress={campaign.walletAddress} 
              donationAmount={amount} 
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}