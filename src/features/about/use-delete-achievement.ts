import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { deleteAboutAchievement } from "@/server/actions/about-achievement";

export const useDeleteAchievement = () => {
  const { status, execute } = useAction(deleteAboutAchievement, {
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

  return { statusDeleteAchievement: status, executeDeleteAchievement: execute };
};
