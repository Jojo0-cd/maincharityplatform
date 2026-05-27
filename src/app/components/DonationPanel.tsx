"use client";

import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

type DonationPanelProps = {
  campaignName: string;
  ethAddress: string;
  bnbAddress: string;
  btcAddress: string;
  goalAmount: number;
  currentRaised?: number; 
};

export default function DonationPanel({ 
  campaignName,
  ethAddress,
  bnbAddress,
  btcAddress,
  goalAmount, 
  currentRaised = 0 
}: DonationPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {/* The Web3 Trigger Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full font-bold py-4 px-4 rounded-md transition-colors bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200"
      >
        Fund This Initiative
      </button>

      {/* Render the powerful CheckoutModal when clicked */}
      {isModalOpen && (
        <CheckoutModal 
          campaignName={campaignName}
          ethAddress={ethAddress}
          bnbAddress={bnbAddress}
          btcAddress={btcAddress}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}