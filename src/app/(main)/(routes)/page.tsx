import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/auth";
import { DataGrid } from "@/components/dashboard/data-grid";
import { getSummary } from "@/server/data/summary";
import { DataChart } from "@/components/dashboard/data-chart";
import { OrderSummary } from "@/components/dashboard/order-summary";
import { getOrders } from "@/server/data/order";
import { TOrderWithOrderItem } from "@/types/order-type";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your data.",
};

export default async function Home() {
  const user = await currentUser();
  const summary = await getSummary();
  const orders = await getOrders(5);

  const formattedOrders: TOrderWithOrderItem[] | null =
    orders &&
    orders.map((order) => {
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
    <div className="flex flex-col">
      <Container className="space-y-4">
        <div className="space-y-2">
          <Heading title={`Welcome back, ${user?.name}`} />
          <Separator />
        </div>
        <div className="flex flex-col gap-3">
          <DataGrid
            totalRevenue={summary.totalRevenue}
            totalOrders={summary.totalOrders.value}
            productSold={summary.productSold}
            productStock={summary.productStock.value}
          />

          <DataChart data={summary.graphData} />

          <OrderSummary data={formattedOrders} />
        </div>
      </Container>
    </div>
  );
}
