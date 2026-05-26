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

  if (!campaign) return <div className="p-20 text-center font-bold text-xl">Campaign Not Found</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto" // Expanded slightly to make the image pop
      >
        <Link href="/" className="text-gray-400 hover:text-blue-600 transition-colors font-bold mb-8 inline-block">
          &larr; Back to Platform
        </Link>

        {/* Hero Image Section */}
        {campaign.imageUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-full h-72 md:h-[450px] rounded-3xl overflow-hidden mb-10 shadow-xl border border-gray-100"
          >
            <img 
              src={campaign.imageUrl} 
              alt={campaign.title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        )}

        {/* Header Section */}
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
          {campaign.title}
        </h1>
        <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
          {campaign.description}
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Main Content Area (Left Side) */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-100">About the Initiative</h3>
            <div className="text-gray-600 leading-loose text-lg space-y-6">
              {/* This renders the \n characters as beautifully spaced paragraphs */}
              {campaign.longDescription ? (
                campaign.longDescription.split('\n').map((paragraph, idx) => (
                  paragraph.trim() !== "" && <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>Full campaign details are being updated. Check back soon!</p>
              )}
            </div>
          </div>

          {/* Checkout/Stats Panel (Right Side Sticky) */}
          <div className="md:col-span-1">
            <div className="sticky top-10">
              {/* Interactive Stats Card */}
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm mb-6">
                <div className="flex flex-col mb-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Current Funding</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black">{campaign.currentRaised}</span>
                    <span className="text-xl font-bold text-gray-400">ETH</span>
                  </div>
                  <p className="text-gray-500 font-medium text-sm">Goal: {campaign.goalAmount} ETH</p>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-8">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((campaign.currentRaised / campaign.goalAmount) * 100, 100)}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                    className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full"
                  />
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-2xl font-black text-white bg-gray-900 hover:bg-black transition-all hover:scale-[1.02] shadow-xl text-lg"
                >
                  Fund This Cause
                </button>
              </div>

              {/* Verification Section */}
              <div className="p-6 border border-gray-100 rounded-3xl bg-white shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Verified Contract</p>
                <code className="text-xs font-mono text-blue-600 break-all bg-blue-50 p-3 rounded-xl block">
                  {campaign.walletAddress}
                </code>
              </div>
            </div>
          </div>

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