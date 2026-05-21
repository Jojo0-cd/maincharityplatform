"use client";

import { useState } from "react";

type DonationPanelProps = {
  walletAddress: string;
  goalAmount: number;
  currentRaised?: number; 
};

export default function DonationPanel({ 
  walletAddress, 
  goalAmount, 
  currentRaised = 0 
}: DonationPanelProps) {
  const [amount, setAmount] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Prevent division by zero if goalAmount isn't set yet
  const safeGoal = goalAmount > 0 ? goalAmount : 1; 
  const progressPercentage = Math.min((currentRaised / safeGoal) * 100, 100);

  // Validation
  const amountNum = Number(amount);
  const isValid = !isNaN(amountNum) && amountNum > 0;

  const handleDonate = async () => {
    if (!isValid) return;
    setStatusMessage(""); // Reset message

    try {
      // 1 ETH = 10^18 Wei. 
      // We use Math.floor to ensure we don't pass a floating point number to BigInt.
      const valueInWei = BigInt(Math.floor(amountNum * 10 ** 18)).toString();
      const uri = `ethereum:${walletAddress}?value=${valueInWei}`;

      // Trigger wallet
      window.location.href = uri;

      // Fallback: silently copy to clipboard as the URI scheme might fail silently
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(walletAddress);
        setStatusMessage("Address copied to clipboard! If your wallet didn't open automatically, you can send funds manually.");
      }
    } catch (e) {
      console.error("Donation trigger failed", e);
      setStatusMessage("An error occurred. Please try again.");
    }
  };

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
        <label htmlFor="donation-amount" className="text-sm font-semibold text-slate-700">
          Amount to Donate (ETH)
        </label>
        <input
          id="donation-amount"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setStatusMessage(""); // Clear feedback when user types a new amount
          }}
          placeholder="0.00" 
          className="bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 p-3 rounded-md text-lg focus:outline-none focus:border-green-500 transition-colors"
          min="0"
          step="0.01" 
        />
      </div>

      {/* The Web3 Button */}
      <button 
        onClick={handleDonate}
        disabled={!isValid}
        aria-disabled={!isValid}
        className={`w-full font-bold py-3 px-4 rounded-md transition-colors ${
          isValid 
            ? "bg-green-500 hover:bg-green-600 text-white" 
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
        }`}
      >
        {isValid ? `Donate ${amountNum} ETH` : "Enter an amount"}
      </button>

      {/* User Feedback Message */}
      {statusMessage && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-md border border-blue-100">
          {statusMessage}
        </div>
      )}
    </div>
  );
}