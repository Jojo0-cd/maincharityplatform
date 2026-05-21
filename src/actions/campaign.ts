'use server';

    import { prisma } from '../lib/prisma';
    import { auth } from '@clerk/nextjs/server';
    import { redirect } from 'next/navigation';

    export async function createCampaign(formData: FormData) {
      const { userId } = await auth();
      if (!userId) throw new Error("Unauthorized");

      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const goalAmount = Number(formData.get('goalAmount'));
      const walletAddress = formData.get('walletAddress') as string;

      await prisma.campaign.create({
        data: {
          title,
          description,
          goalAmount,
          walletAddress,
          creatorId: userId,
        }
      });

      redirect('/');
    }
    