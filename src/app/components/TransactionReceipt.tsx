'use client';

export default function TransactionReceipt({
  txHash,
  amount,
  campaignName,
  currency = 'ETH', // Default to ETH to prevent breaking existing code
  onClose,
}: {
  txHash: string;
  amount: string;
  campaignName: string;
  currency?: string;
  onClose: () => void;
}) {
  // Dynamically set the block explorer based on the currency used
  const explorerUrl = currency === 'BNB' 
  ? `https://bscscan.com/tx/${txHash}` 
  : `https://etherscan.io/tx/${txHash}`;
  
  const explorerName = currency === 'BNB' ? 'BscScan' : 'Etherscan';

  return (
    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
      {/* Success Animation / Icon */}
      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Payment Verified</h2>
      <p className="text-zinc-400 mb-8">
        You successfully funded <span className="text-white font-medium">{campaignName}</span> with {amount} {currency}.
      </p>

      {/* The "Receipt" Card */}
      <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-5 mb-8 text-left space-y-4">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Status</p>
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Confirmed on Chain
          </div>
        </div>

        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Transaction Hash</p>
          <p className="text-sm font-mono text-zinc-300 break-all bg-zinc-900 p-2 rounded border border-zinc-800">
            {txHash}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center py-3 rounded-xl font-bold text-black bg-white hover:bg-zinc-200 transition-colors"
        >
          View on {explorerName} ↗
        </a>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          Back to Campaign
        </button>
      </div>
    </div>
  );
}