import { useRouter } from "next-nprogress-bar";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { createProduct } from "@/server/actions/product";

export const useCreateProduct = () => {
  const router = useRouter();

  const { status, execute } = useAction(createProduct, {
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

  return { statusCreateProduct: status, executeCreateProduct: execute };
};
