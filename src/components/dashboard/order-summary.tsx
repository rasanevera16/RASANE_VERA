"use client";

import { TOrderWithOrderItem } from "@/types/order-type";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface OrderSummaryProps {
  data: TOrderWithOrderItem[] | null;
}

export const OrderSummary = ({ data }: OrderSummaryProps) => {
  return (
    <Card className="rounded-xl border-2 border-gray-100 px-3 py-2 shadow-sm">
      <div className="flex flex-col">
        <CardHeader className="space-y-0 p-0">
          <CardTitle className="line-clamp-1 text-base font-semibold text-primary">
            Pesanan Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2 pt-3">
          <DataTable columns={columns} data={data!} />
        </CardContent>
      </div>
    </Card>
  );
};
