import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X, CircleDotDashed } from "lucide-react";

import { TOrderItemWithProduct, TOrderWithOrderItem } from "@/types/order-type";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { dateFormat, formatCurrency } from "@/lib/utils";
import { CellActions } from "./cell-actions";

export const columns: ColumnDef<TOrderWithOrderItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderItems",
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Barang Pesanan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Nama Pelanggan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Total Pesanan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Total Harga
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Tanggal Pemesanan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = dateFormat(row.getValue("date"));

      return <span className="max-w-5 truncate">{date}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
