import { useRouter } from "next-nprogress-bar";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { editProduct } from "@/server/actions/product";

export const useEditProduct = () => {
  const router = useRouter();

  const { status, execute } = useAction(editProduct, {
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error, {
          position: "bottom-left",
        });
      }
      if (data?.success) {
        router.push("/manage-products", undefined, { showProgressBar: true });
        toast.success(data.success, {
          position: "bottom-left",
        });
      }
    },
  });

  return { statusEditProduct: status, executeEditProduct: execute };
};
