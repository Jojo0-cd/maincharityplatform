"use client"; // We use client for animation hooks

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Note: In a production app, you would fetch these from a dedicated API route.
// For now, we simulate the 'Auto-Pilot' by updating the state.
export default function ImpactDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Simulated metrics - replace these with your actual DB results
  const metrics = {
    totalRaised: 28.4521,
    totalCampaigns: 15,
    donationCount: 142
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <header className="mb-16 flex justify-between items-end">
          <div>
            <Link href="/" className="text-zinc-500 hover:text-blue-400 mb-6 inline-block transition-all font-medium">
              &larr; Back to Platform
            </Link>
            <h1 className="text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Impact Engine
            </h1>
            <p className="text-zinc-400 text-lg">Autonomous, verified, and transparent on-chain data.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Live Node Synced</span>
          </div>
        </header>

        {/* Top Metric Cards - Interactive */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Volume (ETH)", value: metrics.totalRaised.toFixed(4), color: "from-blue-500 to-blue-600" },
            { label: "Active Projects", value: metrics.totalCampaigns, color: "from-purple-500 to-purple-600" },
            { label: "Verified Donations", value: metrics.donationCount, color: "from-emerald-500 to-emerald-600" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">{stat.label}</p>
              <p className="text-5xl font-black relative z-10">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Panel */}
        <div className="grid md:grid-cols-2 gap-8">
           {/* Recent Activity Feed */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6">Recent Network Activity</h3>
            <div className="space-y-4">
              {/* Mock items: map your recentDonations here */}
              <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs">Ξ</div>
                  <div>
                    <p className="font-bold">0.5 ETH</p>
                    <p className="text-xs text-zinc-500">Clean Water Initiative</p>
                  </div>
                </div>
                <button className="text-xs text-blue-400 hover:text-white transition-colors">Verify ↗</button>
              </div>
            </div>
          </div>

          {/* Quick Navigate Panel */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need to contribute?</h3>
              <p className="text-blue-100 mb-8 opacity-80">Join 15+ active projects currently changing lives on the chain.</p>
            </div>
            <Link href="/" className="bg-white text-blue-700 font-bold py-4 px-8 rounded-xl text-center hover:bg-zinc-100 transition-all">
              Explore All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}