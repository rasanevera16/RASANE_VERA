import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { editPrivacyPolicy } from "@/server/actions/privacy-policy";

export const useEditPrivacyPolicy = () => {
  const { status, execute } = useAction(editPrivacyPolicy, {
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

  return { statusEditPrivacyPolicy: status, executeEditPrivacyPolicy: execute };
};
