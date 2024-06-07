import { useRouter } from "next-nprogress-bar";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { deleteOder } from "@/server/actions/order";

interface DeleteOderProps {
  showRedirect?: boolean;
}

export const useDeleteOrder = ({ showRedirect }: DeleteOderProps) => {
  const router = useRouter();

  const { status, execute } = useAction(deleteOder, {
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.error, {
          position: "bottom-left",
        });
      }
      if (res?.success) {
        if (showRedirect === true) {
          router.push("/manage-orders", undefined, {
            showProgressBar: true,
          });
        }

        toast.success(res.success, {
          position: "bottom-left",
        });
      }
    },
  });

  return { statusDeleteOrder: status, executeDeleteOrder: execute };
};
