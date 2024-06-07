import { bulkDeleteProducts } from "@/server/actions/product";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export const useBulkDeleteProducts = () => {
  const { status, execute } = useAction(bulkDeleteProducts, {
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.error, {
          position: "bottom-left",
        });
      }
      if (res?.success) {
        toast.success(res.success, {
          position: "bottom-left",
        });
      }
    },
    onExecute: () => {
      if (status === "executing") {
        toast.loading("Deleting products...", {
          position: "bottom-left",
        });
      }

      if (status === "hasSucceeded") {
        toast.dismiss();
      }
    },
  });

  return {
    statusBulkDeleteProduct: status,
    executeBulkDeleteProduct: execute,
  };
};
