import { generateComponents } from "@uploadthing/react";
import type { OurFileRouter } from "../app/api/uploadthing/core"; // CHANGED: Using ../ instead of @/

// This single function safely generates all UploadThing UI components at once
export const { UploadDropzone, UploadButton } = generateComponents<OurFileRouter>();