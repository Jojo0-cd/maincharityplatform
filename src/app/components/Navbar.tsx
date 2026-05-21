"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null);
  // 1. New state to hold the user's ETH balance
  const [balance, setBalance] = useState<string | null>(null);
  
  const { isLoaded, isSignedIn } = useUser();

  type EthereumProvider = { 
    request: (args: { method: string; params?: unknown }) => Promise<unknown>;
    on: (eventName: string, handler: (accounts: string[]) => void) => void;
  };

  // 2. New function to fetch and format the balance
  const fetchBalance = async (walletAddress: string) => {
    const ethereum = (window as unknown as { ethereum?: EthereumProvider }).ethereum;
    if (!ethereum) return;
    
    try {
      const balanceHex = (await ethereum.request({
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      })) as string;
      
      // Convert hexadecimal Wei to decimal ETH
      const wei = BigInt(balanceHex);
      const ether = Number(wei) / 1e18;
      
      // Round to 4 decimal places so it looks clean in the UI
      setBalance(ether.toFixed(4));
    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const ethereum = (window as unknown as { ethereum?: EthereumProvider }).ethereum;
    if (!ethereum) return;
    try {
      const accounts = (await ethereum.request({ method: "eth_accounts" })) as string[];
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchBalance(accounts[0]); // Fetch balance on initial load
      }
    } catch (error) {
      console.log("Background check issue:", error);
    }
  };

  const connectWallet = async () => {
    const ethereum = (window as unknown as { ethereum?: EthereumProvider }).ethereum;
    if (!ethereum) {
      alert("Please install the MetaMask extension!");
      return;
    }
    try {
      const accounts = (await ethereum.request({ method: "eth_requestAccounts" })) as string[];
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        fetchBalance(accounts[0]); // Fetch balance right after connecting
      }
    } catch (error: unknown) {
      const err = error as { code?: number; message?: string };
      if (err.code === 4001) {
        console.log("User closed the MetaMask popup without connecting.");
      } else if (err.code === -32002) {
        alert("MetaMask is already waiting! Please click the MetaMask fox icon in your browser toolbar to approve the connection.");
      } else {
        console.log("Wallet connection issue:", err.message || err);
      }
    }
  };

  const addWalletListener = () => {
    const ethereum = (window as unknown as { ethereum?: EthereumProvider }).ethereum;
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          fetchBalance(accounts[0]); // Update balance if user switches accounts
        } else {
          setAccount(null);
          setBalance(null); // Clear balance if user disconnects
        }
      });
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  useEffect(() => {
    const initializeWallet = async () => {
      await checkIfWalletIsConnected();
      addWalletListener();
    };

    initializeWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">BlockGives</span>
          </Link>

          <div className="flex items-center gap-4">
            
            {/* Web3: MetaMask Button */}
            <button
              onClick={connectWallet}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-3 ${
                account 
                  ? "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200" 
                  : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
              }`}
            >
              {account ? (
                <>
                  {/* 3. Render the balance with a nice visual pill */}
                  {balance !== null && (
                    <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-gray-200 text-gray-600 font-mono text-xs">
                      {balance} ETH
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {formatAddress(account)}
                  </span>
                </>
              ) : (
                "Connect Wallet"
              )}
            </button>

            {/* Web2: Clerk Auth Buttons */}
            <div className="border-l border-gray-300 pl-4 flex items-center">
              
              {isLoaded && !isSignedIn && (
                <SignInButton mode="modal">
                  <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm">
                    Sign In
                  </button>
                </SignInButton>
              )}

              {isLoaded && isSignedIn && (
                <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
              )}
              
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}