"use client";

import { TProduct } from "@/types/product-type";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { useBulkDeleteProducts } from "@/features/products/use-bulk-delete-product";

interface ProductProps {
  data: TProduct[];
}

const Products = ({ data }: ProductProps) => {
  const { statusBulkDeleteProduct, executeBulkDeleteProduct } =
    useBulkDeleteProducts();

  return (
    <DataTable
      filterKey="name"
      columns={columns}
      data={data}
      onDelete={(row) => {
        const ids = row.map((r) => r.original.id);

        executeBulkDeleteProduct({ ids });
      }}
      disabled={statusBulkDeleteProduct === "executing"}
      loading={statusBulkDeleteProduct === "executing"}
      labelBulkDelete="Products"
      showFilter
      showPagination
    />
  );
};

export default Products;
