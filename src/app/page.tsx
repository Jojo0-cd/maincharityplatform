"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SignInButton, useUser } from "@clerk/nextjs";
import { campaigns } from "../data/campaigns";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      
      {/* HERO SECTION */}
      <div className="relative overflow-hidden pt-24 pb-32 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-50 text-blue-700 mb-8 border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Decentralized Philanthropy
          </span>
          
          <h1 className="text-6xl sm:text-7xl font-black tracking-tighter mb-8 leading-[0.95]">
            Change happens <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500">
              on-chain.
            </span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Eliminate friction, bypass intermediaries, and send your support directly to verified causes with pure transparency.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {isLoaded && isSignedIn ? (
              <Link href="/creator" className="group relative bg-gray-900 text-white font-bold px-10 py-5 rounded-full shadow-2xl hover:bg-black transition-all hover:scale-105">
                Launch a Campaign
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-gray-900 text-white font-bold px-10 py-5 rounded-full shadow-2xl hover:bg-black transition-all hover:scale-105">
                  Start a Campaign
                </button>
              </SignInButton>
            )}
            <Link href="/impact" className="font-bold text-gray-500 hover:text-gray-900 px-8 py-5 transition-colors">
              View Live Impact &rarr;
            </Link>
          </div>
        </motion.div>
      </div>

      {/* CAMPAIGN GRID - Maps the 15 campaigns dynamically */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <motion.div 
              key={campaign.id}
              whileHover={{ y: -10 }}
              className="bg-gray-50 rounded-3xl p-8 flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-black mb-4 tracking-tight leading-snug">{campaign.title}</h3>
              <p className="text-gray-600 mb-10 flex-grow leading-relaxed">{campaign.description}</p>
              
              <div className="mb-8">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
                  <span className="text-blue-600">{campaign.currentRaised} ETH</span>
                  <span className="text-gray-400">Target: {campaign.goalAmount} ETH</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((campaign.currentRaised / campaign.goalAmount) * 100, 100)}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full"
                  />
                </div>
              </div>

              <Link 
                href={`/campaign/${campaign.id}`}
                className="w-full text-center bg-white border border-gray-900 text-gray-900 font-bold py-4 rounded-2xl hover:bg-gray-900 hover:text-white transition-all shadow-sm"
              >
                Fund This Cause
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}