import { createCampaign } from "../../actions/campaign";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function CreateCampaignPage() {
  // 1. Securely check auth on the server
  const { userId } = await auth();

  // 2. If they are NOT logged in, show this fallback UI:
  if (!userId) {
    return (
      <main className="max-w-2xl mx-auto p-8 mt-12 bg-white rounded-lg shadow-md border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Start a Campaign</h1>
        <div className="text-center py-10 bg-slate-50 rounded-md border border-slate-200">
          <p className="text-slate-600 mb-4">You must be signed in to launch a campaign.</p>
          <Link href="/sign-in" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition inline-block">
            Sign In to Continue
          </Link>
        </div>
      </main>
    );
  }

  // 3. If they ARE logged in, show the actual form:
  return (
    <main className="max-w-2xl mx-auto p-8 mt-12 bg-white rounded-lg shadow-md border border-slate-200">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Start a Campaign</h1>
      
      <form action={createCampaign} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Title</label>
          <input required name="title" type="text" className="w-full border border-slate-300 rounded-md p-2" placeholder="Help build a new school..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea required name="description" rows={4} className="w-full border border-slate-300 rounded-md p-2" placeholder="Tell your story..."></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Funding Goal (USDC)</label>
            <input required name="goalAmount" type="number" step="0.01" className="w-full border border-slate-300 rounded-md p-2" placeholder="5000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Receiving Wallet Address</label>
            <input required name="walletAddress" type="text" className="w-full border border-slate-300 rounded-md p-2" placeholder="0x..." />
          </div>
        </div>

        <button type="submit" className="mt-4 bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition">
          Launch Campaign
        </button>
      </form>
    </main>
  );
}