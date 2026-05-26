import Link from 'next/link';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <Link href="/" className="text-zinc-500 hover:text-zinc-800 mb-12 inline-block transition-colors font-medium">
          &larr; Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-black">Transparency by Design</h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            BlockGives uses blockchain technology to ensure every single dollar you donate goes exactly where it is supposed to. No middlemen, no hidden fees.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="text-7xl font-black text-zinc-100 absolute -top-6 -right-4 group-hover:scale-110 transition-transform">1</div>
            <h3 className="text-2xl font-bold mb-4 relative z-10 text-black">Discover</h3>
            <p className="text-zinc-600 relative z-10">Read authentic, verified stories from communities worldwide. Find a cause that resonates with you.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="text-7xl font-black text-zinc-100 absolute -top-6 -right-4 group-hover:scale-110 transition-transform">2</div>
            <h3 className="text-2xl font-bold mb-4 relative z-10 text-black">Fund Directly</h3>
            <p className="text-zinc-600 relative z-10">Connect your Web3 wallet and donate using ETH or USDC. Funds are sent instantly to the campaign&apos;s secure wallet.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="text-7xl font-black text-zinc-100 absolute -top-6 -right-4 group-hover:scale-110 transition-transform">3</div>
            <h3 className="text-2xl font-bold mb-4 relative z-10 text-black">Verify on Chain</h3>
            <p className="text-zinc-600 relative z-10">Get an immutable, public receipt. You can track your exact transaction on the blockchain forever.</p>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center bg-zinc-900 text-white p-12 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Ready to make an impact?</h2>
          <Link href="/" className="inline-block bg-white text-black font-bold py-4 px-8 rounded-xl hover:scale-105 transition-transform">
            Explore Campaigns
          </Link>
        </div>
        
      </div>
    </div>
  );
}