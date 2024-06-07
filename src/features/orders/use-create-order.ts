import { useRouter } from "next-nprogress-bar";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { createOrder } from "@/server/actions/order";

export const useCreateOrder = () => {
  const router = useRouter();

  const { status, execute } = useAction(createOrder, {
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error, {
          position: "bottom-left",
        });
      }
      if (data?.success) {
        router.push("/manage-orders", undefined, { showProgressBar: true });
        toast.success(data.success, {
          position: "bottom-left",
        });
      }
    },
  });

  return { statusCreateOrder: status, executeCreateOrder: execute };
};
