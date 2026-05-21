"use client";

import { useState } from "react";
import CryptoDonationButton from "./CryptoDonationButton";

type DonationPanelProps = {
  walletAddress: string;
  goalAmount: number;
  currentRaised?: number; // Optional, defaults to 0 if not in your DB yet
};

export default function DonationPanel({ walletAddress, goalAmount, currentRaised = 0 }: DonationPanelProps) {
  const [amount, setAmount] = useState("");
  
  // Prevent division by zero if goalAmount isn't set yet
  const safeGoal = goalAmount > 0 ? goalAmount : 1; 
  const progressPercentage = Math.min((currentRaised / safeGoal) * 100, 100);

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Make a Donation</h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span className="text-slate-700">{currentRaised} ETH Raised</span>
          <span className="text-slate-500">{progressPercentage.toFixed(1)}% of Goal</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Input Field */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm font-semibold text-slate-700">Amount to Donate (ETH)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00" 
          className="bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 p-3 rounded-md text-lg focus:outline-none focus:border-green-500 transition-colors"
          min="0.01"
          step="0.01" 
        />
      </div>

      {/* The Web3 Button */}
      <CryptoDonationButton 
        campaignWalletAddress={walletAddress} 
        donationAmount={amount} 
      />
    </div>
  );
}