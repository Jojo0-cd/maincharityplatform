"use client";

import { useState, use } from "react";
import Link from "next/link";
import { campaigns } from "../../page"; 
import CheckoutModal from '../../components/CheckoutModal'; // Import the new modal!

export default function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State
  
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
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Campaign Wallet</p>
              <p className="text-sm font-mono text-gray-700 bg-gray-100 p-2 rounded break-all">
                {campaign.walletAddress}
              </p>
            </div>
          </div>

          <hr className="border-gray-200 mb-8" />

          <div>
            {/* The Trigger Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              Fund This Campaign
            </button>

            {/* The Modal */}
            {isModalOpen && (
              <CheckoutModal 
                campaignName={campaign.title} 
                campaignWalletAddress={campaign.walletAddress}
                onClose={() => setIsModalOpen(false)} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
