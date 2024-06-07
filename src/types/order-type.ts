import { TProduct } from "./product-type";

export type TOrder = {
  id: string;
  customerName: string;
  totalOrder: number;
  totalPrice: number;
  date: Date;
  status: "pending" | "succeeded" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
};

export type TOrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TOrderWithOrderItem = TOrder & {
  orderItems: TOrderItem[];
};

export type TOrderItemWithProduct = TOrderItem & {
  product: TProduct;
};
