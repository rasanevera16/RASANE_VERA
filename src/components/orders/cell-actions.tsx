"use client";

import { Check, MoreHorizontal, Trash } from "lucide-react";

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
import { TOrder } from "@/types/order-type";
import { useModalStore } from "@/stores/modal-store";
import { useDeleteOrder } from "@/features/orders/use-delete-order";
import { useEditOrder } from "@/features/orders/use-edit-order";
import { Loader } from "../ui/loader";

interface CellActionsProps {
  data: TOrder;
}

export const CellActions = ({ data }: CellActionsProps) => {
  const { onOpen } = useModalStore();

  const { statusDeleteOrder, executeDeleteOrder } = useDeleteOrder({
    showRedirect: false,
  });

  const { statusEditOrder, executeEditOrder } = useEditOrder();

  const handleDelete = async () => {
    executeDeleteOrder({ id: data.id });
  };

  return (
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
              onOpen("delete", {
                title: "Apakah kamu yakin?",
                message: (
                  <>
                    Apakah kamu yakin ingin menghapus data pesanan ini? Data
                    pesanan akan dihapus secara permanen. Tindakan ini tidak
                    bisa dibatalkan.
                  </>
                ),
                onDelete: handleDelete,
                loading: statusDeleteOrder === "executing",
              })
            }
          >
            <Trash className="size-4" />
            <span className="flex-1 self-center">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {data.status === "pending" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer gap-3"
                onClick={() =>
                  executeEditOrder({
                    id: data.id,
                  })
                }
              >
                {statusEditOrder === "executing" && <Loader />}

                <Check className="size-4" />
                <span className="flex-1 self-center">Succeeded</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
