"use client";

import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

const boxVariant = cva("shrink-0 rounded-xl p-2 border shadow-sm", {
  variants: {
    variant: {
      default: "bg-[#f7f4fd]",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "text-blue-500",
      success: "text-emerald-500",
      danger: "text-rose-500",
      warning: "text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

type DataCardProps = BoxVariants &
  IconVariants & {
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    children: React.ReactNode;
  };

export const DataCard = ({
  title,
  children,
  icon: Icon,
  variant,
}: DataCardProps) => {
  return (
    <Card className="rounded-xl border-2 border-gray-100 shadow-sm">
      <div className="flex flex-row items-center gap-3 px-3 py-2">
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
        <div className="flex flex-col">
          <CardHeader className="space-y-0 p-0">
            <CardTitle className="line-clamp-1 text-sm font-medium text-gray-700">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">{children}</CardContent>
        </div>
      </div>
    </Card>
  );
};
