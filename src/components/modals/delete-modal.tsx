import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/loading-button";
import { useModalStore } from "@/stores/modal-store";

export const DeleteModal = () => {
  const { isOpen, onClose, type, config } = useModalStore();

  const { title, message, loading, onDelete } = config;
  const isModalOpen = isOpen && type === "delete";

  const handleClose = () => {
    onClose({
      title,
      message,
      loading,
      onDelete,
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    handleClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xs rounded-xl shadow-4 sm:max-w-sm sm:rounded-xl md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <DialogHeader>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10 sm:mx-0 sm:h-10 sm:w-10">
              <TriangleAlert className="size-6 text-destructive" />
            </div>
            <div className="mt-3 space-y-2 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{message}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="pt-2">
          <Button
            onClick={handleClose}
            variant="outline"
            className="relative mt-3 inline-flex w-full justify-center sm:mt-0 sm:w-max"
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={handleDelete}
            variant="destructive"
            size="default"
            loading={loading!}
            loadingType="submit"
            className="relative inline-flex w-full justify-center sm:w-max"
          >
            Confirm
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
