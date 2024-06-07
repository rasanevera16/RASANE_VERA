import * as z from "zod";

export const ProductImagesSchema = z
  .array(
    z.object({
      url: z.string().refine((url) => url.search("blob:") !== 0, {
        message: "Please wait for the image to upload",
      }),
      name: z.string(),
    }),
  )
  .min(1, "At least one image is required");

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Product name is required").trim(),
  slug: z.string(),
  price: z.string().min(1).trim(),
  shortDescription: z
    .string()
    .min(1, "Short description is required")
    .max(50, "Short description must be less than 50 characters")
    .trim(),
  description: z.string().min(1, "Description is required").trim(),
  coverImageUrl: z.string().refine((url) => url.search("blob:") !== 0, {
    message: "Please wait for the image to upload",
  }),
  coverImageName: z.string(),
  productImages: ProductImagesSchema,
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export type ProductValues = z.infer<typeof ProductSchema>;
