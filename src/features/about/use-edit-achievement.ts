import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { editAboutAchievement } from "@/server/actions/about-achievement";

export const useEditAchievement = () => {
  const { status, execute } = useAction(editAboutAchievement, {
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error, {
          position: "bottom-left",
        });
      }
      if (data?.success) {
        toast.success(data.success, {
          position: "bottom-left",
        });
      }
    },
  });

  return { statusEditAchievement: status, executeEditAchievement: execute };
};
