import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, Check, X } from "lucide-react";

import { TProduct } from "@/types/product-type";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { dateFormat, formatCurrency } from "@/lib/utils";
import { CellActions } from "./cell-actions";

export const columns: ColumnDef<TProduct>[] = [
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
    accessorKey: "coverImageUrl",
    header: "Sampul Gambar",
    cell: ({ row }) => {
      const cellImage = row.getValue("coverImageUrl") as string;
      const cellImageName = row.getValue("name") as string;

      return (
        <div className="relative aspect-video h-auto w-full overflow-hidden">
          <Image
            src={cellImage}
            alt={cellImageName}
            fill
            className="rounded-md object-cover object-center"
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Nama Produk
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="max-w-10 truncate font-medium">
          {row.getValue("name")}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Harga Produk
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      return (
        <Badge variant="primary" className="px-2.5 py-1.5 text-xs font-medium">
          {formatCurrency(price)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Tanggal Dibuat
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = dateFormat(row.getValue("createdAt"));

      return <span className="max-w-5 truncate">{createdAt}</span>;
    },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Unggulan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const isFeatured = row.getValue("isFeatured");

      return (
        <Badge
          variant={isFeatured ? "success" : "destructive"}
          className="px-2.5 py-1.5 text-xs font-medium"
        >
          {isFeatured ? (
            <span className="flex items-center gap-x-1.5">
              <Check className="h-4 w-4" />
              Ya
            </span>
          ) : (
            <span className="flex items-center gap-x-1.5">
              <X className="h-4 w-4" />
              Tidak
            </span>
          )}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isArchived",
    header: ({ column }) => {
      return (
        <div className="-mx-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="relative"
          >
            Diarsipkan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const isArchived = row.getValue("isArchived");

      return (
        <Badge
          variant={isArchived ? "success" : "destructive"}
          className="px-2.5 py-1.5 text-xs font-medium"
        >
          {isArchived ? (
            <span className="flex items-center gap-x-1.5">
              <Check className="h-4 w-4" />
              Ya
            </span>
          ) : (
            <span className="flex items-center gap-x-1.5">
              <X className="h-4 w-4" />
              Tidak
            </span>
          )}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
