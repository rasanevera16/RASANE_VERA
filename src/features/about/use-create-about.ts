import { useRouter } from "next-nprogress-bar";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { createAbout } from "@/server/actions/about";

export const useCreateAbout = () => {
  const router = useRouter();

  const { status, execute } = useAction(createAbout, {
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error, {
          position: "bottom-left",
        });
      }
      if (data?.success) {
        router.push("/manage-about", undefined, { showProgressBar: true });
        toast.success(data.success, {
          position: "bottom-left",
        });
      }
    },
  });

  return { statusCreateProduct: status, executeCreateProduct: execute };
};
