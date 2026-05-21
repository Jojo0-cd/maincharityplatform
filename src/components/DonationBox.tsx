"use client";

import { useState } from "react";

// --- HELPER FUNCTION ---
function toHexWei(amount: string) {
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    throw new Error("Invalid donation amount");
  }

  const parts = amount.split(".");
  const integerPart = parts[0] || "0";
  const fractionPart = parts[1] || "";
  
  const paddedFraction = (fractionPart + "0".repeat(18)).slice(0, 18);
  const weiValue = BigInt(integerPart + paddedFraction);
  
  return `0x${weiValue.toString(16)}`;
}

// --- BUTTON COMPONENT ---
type CryptoDonationButtonProps = {
  campaignWalletAddress: string;
  donationAmount: string;
};

function CryptoDonationButton({ campaignWalletAddress, donationAmount }: CryptoDonationButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ 
    type: 'idle', 
    message: '' 
  });

  const handleDonate = async () => {
    if (!donationAmount || Number(donationAmount) <= 0) return;
    
    setStatus({ type: 'idle', message: '' });
    
    type EthRequestArgs = { method: string; params?: unknown };
    type EthereumProvider = {
      request: (args: EthRequestArgs) => Promise<unknown>;
    };

    const ethereum = (window as unknown as { ethereum?: EthereumProvider }).ethereum;

    if (!ethereum) {
      setStatus({ type: 'error', message: 'No crypto wallet found. Please install MetaMask.' });
      return;
    }

    try {
      setIsPending(true);
      
      const accounts = (await ethereum.request({ method: "eth_requestAccounts" })) as string[];
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts connected.");
      }

      const hexAmount = toHexWei(donationAmount);
      
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: campaignWalletAddress,
            value: hexAmount,
          },
        ],
      });

      setStatus({ type: 'success', message: 'Donation successful! Thank you.' });
    } catch (error: unknown) {
      console.error("Transaction failed:", error);
      const errorWithCode = error as { code?: number | string };
      if (errorWithCode.code === 4001) {
        setStatus({ type: 'error', message: 'Transaction rejected in wallet.' });
      } else {
        setStatus({ type: 'error', message: 'Transaction failed.' });
      }
    } finally {
      setIsPending(false);
    }
  };

  const isDisabled = !donationAmount || Number(donationAmount) <= 0 || isPending;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleDonate}
        className={`w-full py-3 rounded-md text-lg font-semibold transition text-white ${
          isDisabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isDisabled}
      >
        {isPending ? 'Confirming in Wallet...' : 'Donate with Crypto'}
      </button>

      {status.message && (
        <div className={`mt-3 p-2 rounded-md text-sm text-center ${
          status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
}

// --- MAIN UI COMPONENT ---
export default function DonationBox() {
  const [amount, setAmount] = useState("");
  
  // Replace with your actual receiving wallet address
  const CAMPAIGN_WALLET_ADDRESS = "0x1234567890123456789012345678901234567890";

  // --- PROGRESS BAR DATA ---
  const goalAmount = 1500;
  const currentRaised = 850; // Hardcoded for now
  const progressPercentage = Math.min((currentRaised / goalAmount) * 100, 100);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm mx-auto border rounded-xl shadow-md bg-white text-black">
      
      {/* PROGRESS BAR SECTION */}
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-semibold text-gray-800">{currentRaised} ETH Raised</span>
          <span className="text-gray-500">Goal: {goalAmount} ETH</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <label className="text-lg font-semibold mt-2">
        Donation Amount (ETH)
      </label>
      
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00" 
        className="bg-white text-black placeholder-gray-400 border-2 border-gray-300 p-3 rounded-md text-lg focus:outline-none focus:border-blue-500"
        min="0.01"
        step="0.01" 
      />

      <CryptoDonationButton 
        campaignWalletAddress={CAMPAIGN_WALLET_ADDRESS} 
        donationAmount={amount} 
      />
    </div>
  );
}