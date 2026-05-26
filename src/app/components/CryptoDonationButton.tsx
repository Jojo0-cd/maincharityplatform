"use client";

import { useState } from "react";
// Import the CheckoutModal component you just created
import CheckoutModal from './CheckoutModal'; 

const [isModalOpen, setIsModalOpen] = useState(false);

// ... inside your render:
<button onClick={() => setIsModalOpen(true)}>Donate Now</button>

{/* RENDER THE MODAL WHEN OPEN */}
      {isModalOpen && (
        <CheckoutModal 
          campaignName="This Campaign" 
          campaignWalletAddress={CAMPAIGN_WALLET_ADDRESS}
          onClose={() => setIsModalOpen(false)} 
        />
      )}

// --- MAIN UI COMPONENT ---
export default function DonationBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Keep your existing progress bar logic
  const goalAmount = 1500;
  const currentRaised = 850; 
  const progressPercentage = Math.min((currentRaised / goalAmount) * 100, 100);
  
  // Note: We don't need the local 'amount' state here anymore, 
  // because the modal handles the input now!

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

      {/* NEW TRIGGER BUTTON */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-2 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
      >
        Fund This Campaign
      </button>

      {/* RENDER THE MODAL WHEN OPEN */}
      {isModalOpen && (
        <CheckoutModal 
          campaignName="This Campaign" 
          campaignWalletAddress={CAMPAIGN_WALLET_ADDRESS}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
  />
)}
    </div>
  );
}
