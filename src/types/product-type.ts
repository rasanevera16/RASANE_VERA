export type TProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  shortDescription: string;
  description: string;
  coverImageUrl: string;
  coverImageName: string;
  isFeatured?: boolean;
  isArchived?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TProductImage = {
  id: string;
  productId: string;
  url: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TProductWithImages = TProduct & { productImages: TProductImage[] };
