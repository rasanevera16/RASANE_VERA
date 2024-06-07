"use client";

import { TProduct, TProductImage } from "@/types/product-type";
import { InsertProductValues } from "@/server/drizzle/schema";
import { useCreateProduct } from "@/features/products/use-create-product";
import { useDeleteProduct } from "@/features/products/use-delete-product";
import { useEditProduct } from "@/features/products/use-edit-product";
import { ProductForm } from "./product-form";

interface ManageProductProps {
  initialData: (TProduct & { productImages: TProductImage[] }) | null;
  productId: string;
}

export const ManageProduct = ({
  initialData,
  productId,
}: ManageProductProps) => {
  const { statusCreateProduct, executeCreateProduct } = useCreateProduct();
  const { statusEditProduct, executeEditProduct } = useEditProduct();
  const { statusDeleteProduct, executeDeleteProduct } = useDeleteProduct({
    showRedirect: true,
  });

  const defaultValues = initialData
    ? {
        ...initialData,
        price: initialData?.price.toString(),
      }
    : {
        name: "",
        slug: "",
        price: "",
        shortDescription: "",
        description: "",
        coverImageUrl: "",
        coverImageName: "",
        productImages: [],
        isFeatured: false,
        isArchived: false,
      };

  const onSubmitCreate = async (values: InsertProductValues) => {
    executeCreateProduct(values);
  };

  const onSubmitEdit = async (values: InsertProductValues) => {
    executeEditProduct({ ...values, id: productId! });
  };

  const onDelete = async () => {
    executeDeleteProduct({ id: productId! });
  };

  return (
    <ProductForm
      id={productId}
      defaultValues={defaultValues}
      initialData={initialData}
      onSubmitCreate={onSubmitCreate}
      onSubmitEdit={onSubmitEdit}
      onDelete={onDelete}
      loading={
        statusCreateProduct === "executing" || statusEditProduct === "executing"
      }
      loadingDelete={statusDeleteProduct === "executing"}
    />
  );
};
