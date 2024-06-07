import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { bulkDeleteOrders } from "@/server/actions/order";

export const useBulkDeleteOrders = () => {
  const { status, execute } = useAction(bulkDeleteOrders, {
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
        toast.loading("Deleting order(s)...", {
          position: "bottom-left",
        });
      }

      if (status === "hasSucceeded") {
        toast.dismiss();
      }
    },
  });

  return {
    statusBulkDeleteOrder: status,
    executeBulkDeleteOrder: execute,
  };
};
