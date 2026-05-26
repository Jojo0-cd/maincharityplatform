// src/utils/formatters.ts

/**
 * Masks a Web3 wallet address for UI display.
 * Example: 0x1234567890abcdef1234567890abcdef12345678 -> 0x1234...5678
 */
export const maskWalletAddress = (address: string | undefined | null) => {
  if (!address || address.length !== 42) return "Unknown Address";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};