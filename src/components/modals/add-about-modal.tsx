"use client";

import { useCreateAbout } from "@/features/about/use-create-about";
import { InsertAboutValues } from "@/server/drizzle/schema";
import { useModalStore } from "@/stores/modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewAboutForm } from "../about/new-about-form";

export const AddAboutModal = () => {
  const { isOpen, onClose, type, config } = useModalStore();
  const { statusCreateProduct, executeCreateProduct } = useCreateAbout();

  const { title, message, loading } = config;
  const isModalOpen = isOpen && type === "addAbout";

  const defaultValues = {
    youtubeUrl: "",
    description: "",
    vision: "",
    mission: "",
  };

  const handleClose = () => {
    onClose({
      title,
      message,
      loading,
    });
  };

  const onSubmit = async (values: InsertAboutValues) => {
    executeCreateProduct(values);
    handleClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xs rounded-xl shadow-4 sm:max-w-sm sm:rounded-xl md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <NewAboutForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={statusCreateProduct === "executing"}
        />
      </DialogContent>
    </Dialog>
  );
};
