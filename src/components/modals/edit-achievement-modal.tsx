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
import { useEditAchievement } from "@/features/about/use-edit-achievement";
import { useDeleteAchievement } from "@/features/about/use-delete-achievement";

export const EditAchievementModal = () => {
  const { isOpen, onClose, type, config, data } = useModalStore();
  const { statusEditAchievement, executeEditAchievement } =
    useEditAchievement();
  const { statusDeleteAchievement, executeDeleteAchievement } =
    useDeleteAchievement();

  const { title, message, loading } = config;
  const { aboutAchievement, id } = data;
  const isModalOpen = isOpen && type === "editAchievement";

  const defaultValues = aboutAchievement
    ? {
        aboutId: aboutAchievement.aboutId,
        count: aboutAchievement.count,
        title: aboutAchievement.title,
        description: aboutAchievement.description,
      }
    : {
        aboutId: "",
        count: 0,
        title: "",
        description: "",
      };

  const handleClose = () => {
    onClose(
      {
        title,
        message,
        loading,
      },
      {
        id,
        aboutAchievement,
      },
    );
  };

  const onSubmit = async (values: InsertAboutAchievementValues) => {
    executeEditAchievement({ ...values, id: aboutAchievement?.id! });
    handleClose();
  };

  const onDelete = async () => {
    executeDeleteAchievement({ id: aboutAchievement?.id! });
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
          loading={statusEditAchievement === "executing"}
          loadingDelete={statusDeleteAchievement === "executing"}
          onDelete={onDelete}
          id={aboutAchievement?.id}
        />
      </DialogContent>
    </Dialog>
  );
};
