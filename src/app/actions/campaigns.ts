"use server";

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { auth } from '@clerk/nextjs/server'; // 1. Import Clerk Auth

// Initialize the Postgres connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function submitCampaign(data: {
  title: string;
  goalAmount: number;
  fullStory: string;
  imageUrl: string;
  walletAddress: string;
}) {
  try {
    // 2. Securely get the logged-in user's ID
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized. Please sign in." };
    }

    // Write the new campaign to the database
    const newCampaign = await prisma.campaign.create({
      data: {
        title: data.title,
        description: data.fullStory.substring(0, 120) + "...", 
        fullStory: data.fullStory,
        goalAmount: data.goalAmount,
        currentRaised: 0,
        walletAddress: data.walletAddress,
        imageUrl: data.imageUrl,
        creatorId: userId, // 3. Link the campaign to the user (Adjust 'creatorId' if your schema named it 'userId')
      },
    });

    return { success: true, campaignId: newCampaign.id };
  } catch (error) {
    console.error("Database Insert Error:", error);
    return { success: false, error: "Failed to save campaign." };
  }
}