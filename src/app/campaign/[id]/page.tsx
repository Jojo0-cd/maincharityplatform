"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { campaigns } from "../../../data/campaigns"; 
import CheckoutModal from '../../components/CheckoutModal';

export default function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) return <div className="p-20 text-center">Campaign Not Found</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <Link href="/" className="text-gray-400 hover:text-blue-600 transition-colors font-bold mb-8 block">
          &larr; Back to Platform
        </Link>

        {/* Header Section */}
        <h1 className="text-6xl font-black tracking-tighter mb-6 leading-none">
          {campaign.title}
        </h1>
        <p className="text-xl text-gray-500 mb-12 leading-relaxed">
          {campaign.description}
        </p>

        {/* Interactive Stats Card */}
        <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-sm mb-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Current Funding</p>
              <p className="text-5xl font-black">{campaign.currentRaised} ETH</p>
            </div>
            <p className="text-gray-400 font-bold">Goal: {campaign.goalAmount} ETH</p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-6">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((campaign.currentRaised / campaign.goalAmount) * 100, 100)}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-5 rounded-2xl font-black text-white bg-gray-900 hover:bg-black transition-all hover:scale-[1.01] shadow-xl text-lg"
          >
            Fund This Cause
          </button>
        </div>

        {/* Verification Section */}
        <div className="p-6 border border-gray-100 rounded-2xl">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Verified Contract Address</p>
          <code className="text-sm font-mono text-blue-600 break-all">{campaign.walletAddress}</code>
        </div>
      </motion.div>

      {isModalOpen && (
        <CheckoutModal 
          campaignName={campaign.title} 
          campaignWalletAddress={campaign.walletAddress}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}