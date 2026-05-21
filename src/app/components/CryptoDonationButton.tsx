"use client";

import { useState } from "react";

// --- TYPE DEFINITIONS ---
// Declaring this at the top guarantees the compiler registers the interface safely.
interface CryptoDonationButtonProps {
  campaignWalletAddress: string;
  donationAmount: string; // Matched with string state to prevent prop type mismatches
}

// --- CHILD COMPONENT: CryptoDonationButton ---
// Declaring child components cleanly allows clean compilation.
function CryptoDonationButton({ campaignWalletAddress, donationAmount }: CryptoDonationButtonProps) {
  const amountNum = Number(donationAmount);
  const isValid = !isNaN(amountNum) && amountNum > 0;

  const handleDonate = () => {
    if (!isValid) return;
    
    // Attempt to open a wallet using the ethereum: URI scheme
    const uri = `ethereum:${campaignWalletAddress}?value=${amountNum}`;
    try {
      window.location.href = uri;
    } catch (e) {
      // Fallback: copy address to clipboard if deep link is unhandled
      navigator.clipboard?.writeText(campaignWalletAddress);
      alert('Address copied to clipboard. Use your wallet to send the donation.');
    }
  };

  return (
    <button
      onClick={handleDonate}
      disabled={!isValid}
      className={`w-full mt-2 py-3 rounded-md font-semibold text-white transition-colors ${
        isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
      }`}
      aria-disabled={!isValid}
    >
      {isValid ? `Donate ${amountNum} ETH` : 'Enter an amount'}
    </button>
  );
}

// --- MAIN UI COMPONENT ---
export default function DonationBox() {
  const [amount, setAmount] = useState("");
  
  // Replace with your actual receiving wallet address
  const CAMPAIGN_WALLET_ADDRESS = "0x1234567890123456789012345678901234567890";

  // --- PROGRESS BAR DATA ---
  const goalAmount = 1500;
  const currentRaised = 850; // Update this dynamically later
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