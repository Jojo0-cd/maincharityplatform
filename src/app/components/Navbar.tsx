"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

// 1. Define the Ethereum Provider type clearly at the top
type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] | unknown }) => Promise<unknown>;
  on: (eventName: string, handler: (accounts: string[]) => void) => void;
  removeListener: (eventName: string, handler: (accounts: string[]) => void) => void;
};

// 2. Extend the Window object to prevent TS errors globally in this file
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const { isLoaded, isSignedIn } = useUser();

  // Helper to format the wallet address (e.g., 0x1234...abcd)
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Wrapped in useCallback to safely use inside useEffect
  const fetchBalance = useCallback(async (walletAddress: string) => {
    if (!window.ethereum) return;

    try {
      const balanceHex = (await window.ethereum.request({
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      })) as string;

      // Convert hexadecimal Wei to decimal ETH
      const wei = BigInt(balanceHex);
      const ether = Number(wei) / 1e18;

      setBalance(ether.toFixed(4));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install the MetaMask extension!");
      return;
    }

    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        fetchBalance(accounts[0]);
      }
    } catch (error: any) {
      if (error?.code === 4001) {
        console.log("User closed the MetaMask popup without connecting.");
      } else if (error?.code === -32002) {
        alert("MetaMask is already waiting! Please check your browser extensions.");
      } else {
        console.error("Wallet connection issue:", error.message || error);
      }
    }
  };

  useEffect(() => {
    const ethereum = window.ethereum;

    const checkIfWalletIsConnected = async () => {
      if (!ethereum) return;
      try {
        const accounts = (await ethereum.request({ method: "eth_accounts" })) as string[];
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          fetchBalance(accounts[0]);
        }
      } catch (error) {
        console.error("Background check issue:", error);
      }
    };

    // The handler function for when a user switches accounts in MetaMask
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchBalance(accounts[0]);
      } else {
        // User disconnected their wallet from the site
        setAccount(null);
        setBalance(null);
      }
    };

    // Initialize wallet state
    checkIfWalletIsConnected();

    // Set up the listener
    if (ethereum) {
      ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Cleanup function to prevent memory leaks when the component unmounts
    return () => {
      if (ethereum && ethereum.removeListener) {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [fetchBalance]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">
              BlockGives
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Web3: MetaMask Button */}
            <button
              onClick={connectWallet}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-3 ${
                account 
                  ? "bg-gray-50 text-gray-800 border border-gray-200 hover:bg-gray-100" 
                  : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
              }`}
            >
              {account ? (
                <>
                  {balance !== null && (
                    <span className="bg-white px-2.5 py-1 rounded-md shadow-sm border border-gray-200 text-gray-700 font-mono text-xs">
                      {balance} ETH
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    {formatAddress(account)}
                  </span>
                </>
              ) : (
                "Connect Wallet"
              )}
            </button>

            {/* Web2: Clerk Auth Buttons */}
            <div className="border-l border-gray-200 pl-4 flex items-center min-h-[36px]">
              {isLoaded && !isSignedIn && (
                <SignInButton mode="modal">
                  <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm">
                    Sign In
                  </button>
                </SignInButton>
              )}

              {isLoaded && isSignedIn && (
                <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 shadow-sm" } }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
