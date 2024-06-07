"use client";

import { useCreateOrder } from "@/features/orders/use-create-order";
import { InsertOrderValues, statusEnum } from "@/server/drizzle/schema";
import OrderForm from "./order-form";
import { TProductWithImages } from "@/types/product-type";

interface NewOrderProps {
  products: TProductWithImages[];
}

const NewOrder = ({ products }: NewOrderProps) => {
  const { statusCreateOrder, executeCreateOrder } = useCreateOrder();

  const defaultValues = {
    customerName: "",
    date: new Date(),
    status: statusEnum.enumValues[0] || "pending",
  };

  const onSubmit = async (values: InsertOrderValues) => {
    executeCreateOrder(values);
  };

  return (
    <OrderForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      disabled={statusCreateOrder === "executing"}
      loading={statusCreateOrder === "executing"}
      products={products}
    />
  );
};

export default NewOrder;
