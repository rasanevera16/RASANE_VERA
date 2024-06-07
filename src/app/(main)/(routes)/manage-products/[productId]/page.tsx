import { Metadata } from "next";

import { getProduct } from "@/server/data/product";
import { ManageProduct } from "@/components/products/manage-product";

interface EditProductPageProps {
  params: {
    productId: string;
  };
}

export const generateMetadata = async ({
  params: { productId },
}: EditProductPageProps): Promise<Metadata> => {
  const product = await getProduct(productId);

  return {
    title: product ? `${product?.name} - Edit` : "Create a New Product",
    description: product ? "Edit and existing product" : "Add a new product",
  };
};

const EditProductPage = async ({
  params: { productId },
}: EditProductPageProps) => {
  const product = await getProduct(productId);

  return <ManageProduct initialData={product} productId={productId} />;
};

export default EditProductPage;
