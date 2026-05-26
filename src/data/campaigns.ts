export interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentRaised: number;
  walletAddress: string;
}

export const campaigns: Campaign[] = [
  { id: "clean-water", title: "Clean Water Initiative", description: "Sustainable water wells in rural communities.", goalAmount: 5.0, currentRaised: 2.1, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "tech-for-kids", title: "Tech For Kids", description: "Laptops and internet for students.", goalAmount: 10.0, currentRaised: 8.5, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "emergency-relief", title: "Emergency Relief Fund", description: "Disaster response and supply distribution.", goalAmount: 2.0, currentRaised: 0.5, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "ocean-cleanup", title: "Ocean Cleanup Project", description: "Removing plastic waste from coastal areas.", goalAmount: 8.0, currentRaised: 3.2, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "urban-gardens", title: "Urban Green Gardens", description: "Transforming empty lots into community food sources.", goalAmount: 3.5, currentRaised: 1.8, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "animal-shelter", title: "No-Kill Animal Shelter", description: "Medical care and rehoming for stray pets.", goalAmount: 4.0, currentRaised: 2.9, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "senior-companions", title: "Senior Companionship", description: "Bridging the gap of loneliness for the elderly.", goalAmount: 1.5, currentRaised: 0.9, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "literacy-boost", title: "Literacy for All", description: "Providing free books and reading programs.", goalAmount: 2.5, currentRaised: 1.1, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "renewable-energy", title: "Solar Power Village", description: "Installing solar panels in off-grid homes.", goalAmount: 12.0, currentRaised: 4.5, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "mental-health", title: "Mind Matters", description: "Free mental health workshops and counseling.", goalAmount: 5.0, currentRaised: 2.0, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "tree-planting", title: "Global Reforestation", description: "Planting native trees to combat climate change.", goalAmount: 6.0, currentRaised: 3.8, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "youth-sports", title: "Community Sports Arena", description: "Equipment and training for local youth teams.", goalAmount: 4.5, currentRaised: 1.2, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "refugee-support", title: "Refugee Relief", description: "Housing and food security for displaced families.", goalAmount: 15.0, currentRaised: 9.0, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "disability-advocacy", title: "Accessible Pathways", description: "Installing ramps and accessibility tools.", goalAmount: 3.0, currentRaised: 0.7, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
  { id: "music-arts", title: "Arts in Schools", description: "Funding instruments for underprivileged schools.", goalAmount: 2.0, currentRaised: 1.5, walletAddress: "0x7100f7A88490724EbCb2028d16384743cD4d4A45" },
];