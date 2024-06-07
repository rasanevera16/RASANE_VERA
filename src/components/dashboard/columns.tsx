import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X, CircleDotDashed } from "lucide-react";

import { TOrderItemWithProduct, TOrderWithOrderItem } from "@/types/order-type";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { dateFormat, formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<TOrderWithOrderItem>[] = [
  {
    accessorKey: "orderItems",
    header: "Barang Pesanan",
    cell: ({ row }) => {
      const orderItems: TOrderItemWithProduct[] = row.getValue("orderItems");

      return (
        <span className="max-w-10 truncate font-medium">
          {orderItems.map((orderItem) => orderItem.product.name).join(", ")}
        </span>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: "Nama Pelanggan",
    cell: ({ row }) => {
      return (
        <span className="max-w-10 truncate font-medium">
          {row.getValue("customerName")}
        </span>
      );
    },
  },

  {
    accessorKey: "totalOrder",
    header: "Total Pesanan",
    cell: ({ row }) => {
      const totalOrder = parseFloat(row.getValue("totalOrder"));

      return (
        <Badge
          variant="custom_secondary"
          className="flex size-4 items-center justify-center p-3 text-xs font-medium"
        >
          {totalOrder}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Harga",
    cell: ({ row }) => {
      const totalPrice = parseFloat(row.getValue("totalPrice"));

      return (
        <Badge variant="primary" className="px-2.5 py-1.5 text-xs font-medium">
          {formatCurrency(totalPrice)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Tanggal Pesanan",
    cell: ({ row }) => {
      const date = dateFormat(row.getValue("date"));

      return <span className="max-w-5 truncate">{date}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <Badge
          variant={
            status === "succeeded"
              ? "success"
              : status === "pending"
                ? "custom_secondary"
                : "destructive"
          }
          className="px-2.5 py-1.5 text-xs font-medium"
        >
          {status === "succeeded" && (
            <span className="flex items-center gap-x-1.5">
              <Check className="h-4 w-4" />
              Succeeded
            </span>
          )}

          {status === "pending" && (
            <span className="flex items-center gap-x-1.5">
              <CircleDotDashed className="h-4 w-4" />
              Pending
            </span>
          )}

          {status === "cancelled" && (
            <span className="flex items-center gap-x-1.5">
              <X className="h-4 w-4" />
              Cancelled
            </span>
          )}
        </Badge>
      );
    },
  },
];
