import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app
export const ourFileRouter = {
  // Define the route for your campaign cover photos
  campaignImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      // This runs on your server after a successful upload
      console.log("Upload complete! File URL:", file.url);
      
      return { url: file.url };
    }),
} satisfies FileRouter;

// This is the crucial line your frontend is looking for!
export type OurFileRouter = typeof ourFileRouter;