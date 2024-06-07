import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { currentUser } from "@/lib/auth";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();

  if (!user) throw new UploadThingError("Unauthorized");

  return { userId: user.id };
};

export const ourFileRouter = {
  productImages: f({
    image: { maxFileSize: "1MB", maxFileCount: 10, minFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadError(async ({ error }) => {
      console.error("Upload error", error);
      return { error: "Upload failed" };
    })
    .onUploadComplete(() => {}),
  coverProductImage: f({
    image: { maxFileSize: "1MB", maxFileCount: 1, minFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadError(async ({ error }) => {
      console.error("Upload error", error);
      return { error: "Upload failed" };
    })
    .onUploadComplete(() => {}),
} as FileRouter;

export type OurFileRouter = typeof ourFileRouter;
