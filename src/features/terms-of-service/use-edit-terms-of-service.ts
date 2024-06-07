import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { editTermsOfService } from "@/server/actions/term-of-service";

export const useEditTermsOfService = () => {
  const { status, execute } = useAction(editTermsOfService, {
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

  return {
    statusEditTermsOfService: status,
    executeEditTermsOfService: execute,
  };
};
