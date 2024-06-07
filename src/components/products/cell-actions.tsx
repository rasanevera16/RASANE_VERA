"use client";

import { useRouter } from "next-nprogress-bar";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { TProduct } from "@/types/product-type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useModalStore } from "@/stores/modal-store";
import { useDeleteProduct } from "@/features/products/use-delete-product";

interface CellActionsProps {
  data: TProduct;
}

export const CellActions = ({ data }: CellActionsProps) => {
  const router = useRouter();
  const { onOpen } = useModalStore();

  const { statusDeleteProduct, executeDeleteProduct } = useDeleteProduct({
    showRedirect: false,
  });

  const handleDelete = async () => {
    executeDeleteProduct({ id: data.id });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer gap-3"
              onClick={() =>
                router.push(`/manage-products/${data.id}`, undefined, {
                  showProgressBar: true,
                })
              }
            >
              <Edit className="size-4" />
              <span className="flex-1 self-center">Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer gap-3"
              onClick={() =>
                onOpen("delete", {
                  title: "Apakah kamu yakin?",
                  message: (
                    <>
                      Apakah kamu yakin ingin menghapus produk ini? Produk{" "}
                      <span className="font-semibold text-primary-purple">
                        {data.name}
                      </span>{" "}
                      akan dihapus secara permanen. Tindakan ini tidak bisa
                      dibatalkan.
                    </>
                  ),
                  onDelete: handleDelete,
                  loading: statusDeleteProduct === "executing",
                })
              }
            >
              <Trash className="size-4" />
              <span className="flex-1 self-center">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
