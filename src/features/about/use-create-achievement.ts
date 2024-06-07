import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { createAboutAchievement } from "@/server/actions/about-achievement";

export const useCreateAchievement = () => {
  const { status, execute } = useAction(createAboutAchievement, {
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

  return { statusCreateAchievement: status, executeCreateAchievement: execute };
};
