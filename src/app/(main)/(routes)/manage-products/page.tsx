import { Metadata } from "next";

import { ContentHeader } from "@/components/content-header";
import Products from "@/components/products";
import { Container } from "@/components/ui/container";
import { TProduct } from "@/types/product-type";
import { getProducts } from "@/server/data/product";

export const metadata: Metadata = {
  title: "Manage Products",
  description: "Manage your products.",
};

const ManageProductsPage = async () => {
  const products = await getProducts();

  const formattedProducts: TProduct[] = products.map((product) => {
    return {
      id: product.id,
      coverImageUrl: product.coverImageUrl,
      coverImageName: product.coverImageName,
      slug: product.slug,
      name: product.name,
      price: product.price,
      shortDescription: product.shortDescription,
      description: product.description,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt as Date,
    };
  });

  return (
    <>
      <ContentHeader
        title={`Produk (${formattedProducts.length})`}
        link="/manage-products/new"
      />
      <Container className="mt-10">
        <Products data={formattedProducts} />
      </Container>
    </>
  );
};

export default ManageProductsPage;
