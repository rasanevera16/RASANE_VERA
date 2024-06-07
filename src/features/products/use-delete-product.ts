import { useRouter } from "next-nprogress-bar";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { deleteProduct } from "@/server/actions/product";

interface DeleteProductProps {
  showRedirect?: boolean;
}

export const useDeleteProduct = ({ showRedirect }: DeleteProductProps) => {
  const router = useRouter();

  const { status, execute } = useAction(deleteProduct, {
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.error, {
          position: "bottom-left",
        });
      }
      if (res?.success) {
        if (showRedirect === true) {
          router.push("/manage-products", undefined, { showProgressBar: true });
        }
        toast.success(res.success, {
          position: "bottom-left",
        });
      }
    },
  });

  return { statusDeleteProduct: status, executeDeleteProduct: execute };
};
