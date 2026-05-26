"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] | unknown }) => Promise<unknown>;
  on: (eventName: string, handler: (accounts: string[]) => void) => void;
  removeListener: (eventName: string, handler: (accounts: string[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const { isLoaded, isSignedIn } = useUser();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const fetchBalance = useCallback(async (walletAddress: string) => {
    if (!window.ethereum) return;

    try {
      const balanceHex = (await window.ethereum.request({
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      })) as string;

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
    } catch (error: unknown) {
      const err = error as { code?: number; message?: string };
      if (err.code === 4001) {
        console.log("User closed the MetaMask popup without connecting.");
      } else if (err.code === -32002) {
        alert("MetaMask is already waiting! Please check your browser extensions.");
      } else {
        console.error("Wallet connection issue:", err.message || error);
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

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchBalance(accounts[0]);
      } else {
        setAccount(null);
        setBalance(null);
      }
    };

    checkIfWalletIsConnected();

    if (ethereum) {
      ethereum.on("accountsChanged", handleAccountsChanged);
    }

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
          
          {/* Left Side: Logo & Main Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-blue-600 tracking-tight">
                BlockGives
              </span>
            </Link>

            {/* Main Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/how-it-works" 
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                How it Works
              </Link>
              <Link 
                href="/impact" 
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Live Impact
              </Link>
              
              {/* CONDITIONAL: Only displays when signed in */}
              {isLoaded && isSignedIn && (
                <Link 
                  href="/creator" 
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg"
                >
                  Creator Studio
                </Link>
              )}
            </div>
          </div>

          {/* Right Side: Wallet & Auth */}
          <div className="flex items-center gap-4">
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