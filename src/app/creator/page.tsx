"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // ADDED Variants
import { UploadDropzone } from "../../utils/uploadthing"; // CHANGED: Importing from your utils folder
import Link from "next/link";

// MOVED OUTSIDE: Keeps the animation stable and fixes the variant error
const slideVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function CreatorStudio() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    goalAmount: "",
    fullStory: "",
    imageUrl: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row font-sans">
      
      {/* LEFT SIDE: Interactive Stepper Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center min-h-screen bg-white shadow-2xl z-10">
        <div className="max-w-md w-full mx-auto">
          
          <Link href="/" className="text-sm font-semibold text-zinc-400 hover:text-zinc-800 transition-colors mb-12 block">
            &larr; Exit Studio
          </Link>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? "bg-blue-600" : "bg-zinc-100"}`} />
            ))}
          </div>

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Basics */}
              {step === 1 && (
                <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="absolute w-full">
                  <h2 className="text-3xl font-bold mb-2 text-black">Campaign Basics</h2>
                  <p className="text-zinc-500 mb-8">Let&apos;s start with a strong title and a realistic funding goal.</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Campaign Title</label>
                      <input 
                        type="text" 
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Clean Water for Kodigo Village"
                        className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Goal Amount (ETH)</label>
                      <input 
                        type="number" 
                        value={formData.goalAmount}
                        onChange={(e) => setFormData({ ...formData, goalAmount: e.target.value })}
                        placeholder="0.5"
                        className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-black"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Media */}
              {step === 2 && (
                <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="absolute w-full">
                  <h2 className="text-3xl font-bold mb-2 text-black">Cover Photo</h2>
                  <p className="text-zinc-500 mb-8">Upload a high-quality image that tells your story at a glance.</p>
                  
                  <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl p-4 hover:bg-zinc-100 transition-colors">
                    {formData.imageUrl ? (
                      <div className="text-center p-8">
                        <p className="text-green-600 font-bold mb-2">✓ Image Uploaded Successfully</p>
                        <button onClick={() => setFormData({...formData, imageUrl: ""})} className="text-sm text-zinc-500 underline">Remove and try again</button>
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="campaignImage"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]) {
                            setFormData({ ...formData, imageUrl: res[0].url });
                          }
                        }}
                        onUploadError={(error: Error) => {
                          alert(`Upload Failed: ${error.message}`);
                        }}
                        className="ut-button:bg-blue-600 ut-button:ut-readying:bg-blue-500 ut-label:text-blue-600"
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: The Story */}
              {step === 3 && (
                <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="absolute w-full">
                  <h2 className="text-3xl font-bold mb-2 text-black">The Full Story</h2>
                  <p className="text-zinc-500 mb-8">Explain why you are raising funds and how the money will be used. Be authentic.</p>
                  
                  <textarea 
                    value={formData.fullStory}
                    onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
                    placeholder="Write your story here..."
                    rows={8}
                    className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none text-black"
                  />
                </motion.div>
              )}

              {/* STEP 4: Review & Deploy */}
              {step === 4 && (
                <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="absolute w-full">
                  <h2 className="text-3xl font-bold mb-2 text-black">Ready to Deploy</h2>
                  <p className="text-zinc-500 mb-8">Review your campaign preview on the right. If everything looks perfect, it&apos;s time to launch it to the blockchain.</p>
                  
                  <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8">
                    <h4 className="font-bold text-blue-900 mb-2">Wallet Security Check</h4>
                    <p className="text-sm text-blue-800">Your connected MetaMask wallet will be permanently set as the receiver of all funds for this campaign. This cannot be changed later.</p>
                  </div>

                  <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-lg">
                    Deploy Campaign to Network
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-6 border-t border-zinc-100">
            <button 
              onClick={prevStep} 
              disabled={step === 1}
              className={`font-semibold px-6 py-2 rounded-full transition-colors ${step === 1 ? "text-zinc-300 cursor-not-allowed" : "text-zinc-600 hover:bg-zinc-100"}`}
            >
              Back
            </button>
            
            {step < 4 && (
              <button 
                onClick={nextStep}
                className="bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 hover:shadow-md transition-all"
              >
                Continue
              </button>
            )}
          </div>

        </div>
      </div>

      {/* RIGHT SIDE: Live Mobile Preview */}
      <div className="hidden md:flex w-1/2 bg-zinc-100 items-center justify-center p-16 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        {/* The Mobile Device Mockup */}
        <div className="w-[380px] h-[780px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-zinc-800 relative overflow-hidden z-10 flex flex-col">
          {/* Mobile Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 rounded-b-3xl w-40 mx-auto z-20"></div>
          
          {/* Preview Content */}
          <div className="flex-1 overflow-y-auto pb-10">
            {/* Image Area */}
            <div className="h-64 bg-zinc-200 relative w-full">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Campaign Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 font-medium">Cover Photo Placeholder</div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-4">ACTIVE</span>
              <h3 className="text-2xl font-black mb-2 text-black leading-tight">
                {formData.title || "Your Campaign Title Will Appear Here"}
              </h3>
              
              <div className="mt-6 mb-6">
                <div className="flex justify-between text-sm mb-2 font-bold text-black">
                  <span>0 ETH</span>
                  <span className="text-zinc-500">of {formData.goalAmount || "0.00"} ETH</span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-3"></div>
              </div>

              <div className="prose prose-sm text-zinc-600">
                {formData.fullStory ? (
                  <p className="whitespace-pre-wrap">{formData.fullStory}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="h-4 bg-zinc-100 rounded w-full"></div>
                    <div className="h-4 bg-zinc-100 rounded w-5/6"></div>
                    <div className="h-4 bg-zinc-100 rounded w-4/6"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sticky Fake Donate Button */}
          <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-white via-white to-transparent">
            <div className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl text-center opacity-50 cursor-not-allowed">
              Donate to Campaign
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}