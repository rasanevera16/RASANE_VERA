import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { editAbout } from "@/server/actions/about";

export const useEditAbout = () => {
  const { status, execute } = useAction(editAbout, {
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

  return { statusEditProduct: status, executeEditProduct: execute };
};
