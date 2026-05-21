import Link from "next/link";

// 1. ADDED: Unique walletAddress for every campaign!
export const campaigns = [
  {
    id: "clean-water",
    title: "Clean Water Initiative",
    description: "Help us build sustainable water wells in rural communities.",
    goalAmount: 5.0,
    currentRaised: 2.1,
    walletAddress: "0x1111111111111111111111111111111111111111", // Example Wallet A
  },
  {
    id: "tech-for-kids",
    title: "Tech For Kids",
    description: "Providing laptops and internet access to underprivileged students.",
    goalAmount: 10.0,
    currentRaised: 8.5,
    walletAddress: "0x2222222222222222222222222222222222222222", // Example Wallet B
  },
  {
    id: "emergency-relief",
    title: "Emergency Relief Fund",
    description: "Immediate disaster response and supply distribution.",
    goalAmount: 2.0,
    currentRaised: 0.5,
    walletAddress: "0x3333333333333333333333333333333333333333", // Example Wallet C
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Support Our Causes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a campaign below to donate directly using Ethereum. Every contribution makes a difference.
          </p>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col h-full hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
              <p className="text-gray-600 mb-6 flex-grow">{campaign.description}</p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span className="text-blue-600">{campaign.currentRaised} ETH Raised</span>
                  <span className="text-gray-500">Goal: {campaign.goalAmount} ETH</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((campaign.currentRaised / campaign.goalAmount) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* The Next.js Link to the dynamic page */}
              <Link 
                href={`/campaign/${campaign.id}`}
                className="w-full block text-center bg-gray-900 text-white font-semibold py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                View Campaign
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}