import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const loadingVariants = cva(
  "relative animate-spin rounded-full border-b-2 flex items-center justify-center h-full w-full",
  {
    variants: {
      variant: {
        default: "border-white",
        primary: "border-gray-800",
      },
      size: {
        default: "size-5",
        primary: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(loadingVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Loading.displayName = "Loading";

export { Loading, loadingVariants };
