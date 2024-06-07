import { useCreateAchievement } from "@/features/about/use-create-achievement";
import { InsertAboutAchievementValues } from "@/server/drizzle/schema";
import { useModalStore } from "@/stores/modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AchievementForm } from "../about/achievement-form";

export const AddAchievementModal = () => {
  const { isOpen, onClose, type, config, data } = useModalStore();
  const { statusCreateAchievement, executeCreateAchievement } =
    useCreateAchievement();

  const { title, message, loading } = config;
  const { id } = data;
  const isModalOpen = isOpen && type === "addAchievement";

  const defaultValues = {
    aboutId: "",
    count: 0,
    title: "",
    description: "",
  };

  const handleClose = () => {
    onClose({
      title,
      message,
      loading,
    });
  };

  const onSubmit = async (values: InsertAboutAchievementValues) => {
    executeCreateAchievement({ ...values, aboutId: id! });
    handleClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xs rounded-xl shadow-4 sm:max-w-sm sm:rounded-xl md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <AchievementForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={statusCreateAchievement === "executing"}
        />
      </DialogContent>
    </Dialog>
  );
};
