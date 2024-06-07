import { Metadata } from "next";

import { ContentHeader } from "@/components/content-header";
import Orders from "@/components/orders";
import { Container } from "@/components/ui/container";
import { db } from "@/server/drizzle";
import { TOrderWithOrderItem } from "@/types/order-type";

export const metadata: Metadata = {
  title: "Manage Orders Data",
  description: "Manage your orders data.",
};

const ManageOrdersData = async () => {
  const getOrders = await db.query.orders.findMany({
    with: {
      orderItems: {
        with: {
          product: true,
        },
      },
    },
    orderBy: (order, { desc }) => [desc(order.date)],
  });

  const formattedOrders: TOrderWithOrderItem[] = getOrders.map((order) => {
    return {
      id: order.id,
      orderItems: order.orderItems,
      customerName: order.customerName,
      totalOrder: order.totalOrder,
      totalPrice: order.totalPrice,
      date: order.date as Date,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt as Date,
    };
  });

  return (
    <>
      <ContentHeader
        title={`Pesanan (${formattedOrders.length})`}
        link="/manage-orders/new"
      />
      <Container className="mt-10">
        <Orders data={formattedOrders} />
      </Container>
    </>
  );
};

export default ManageOrdersData;
