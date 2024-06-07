import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 before:absolute before:inset-0 before:rounded-full before:transition before:duration-300 active:duration-75 active:before:scale-95 disabled:pointer-events-none disabled:opacity-50 gap-2.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        custom_default:
          "relative text-white before:bg-primary-purple before:hover:bg-purple-700 hover:before:scale-105",
        custom_primary:
          "relative text-white before:bg-primary-purple before:hover:bg-purple-700",
        custom_secondary:
          "relative text-white before:bg-primary-soft-violet before:hover:bg-primary-soft-violet/90",
        custom_outline:
          "relative border border-input bg-transparent hover:bg-background hover:text-accent-foreground",
        custom_outline_primary:
          "relative before:border before:border-gray-300 text-gray-700",
        custom_outline_secondary:
          "relative before:border before:border-primary-purple/50 text-primary-purple hover:bg-primary-purple/10",
        custom_outline_tertiary:
          "relative border border-primary-purple/50 text-primary-purple hover:bg-primary-purple/10 bg-transparent",
        custom_link_primary:
          "relative text-primary-purple before:bg-primary-purple/10 hover:before:bg-primary-purple/[0.15] before:bg-gradient-to-b before:border before:border-transparent",
        custom_link_secondary:
          "relative text-primary-purple hover:text-purple-700 underline-offset-4 hover:underline",
        custom_bookmark:
          "relative before:bg-gray-800 before:hover:bg-gray-900/70",
        custom_social:
          "relative bg-gray-100 hover:bg-gray-200/80 text-gray-800",
        custom_tertiary: "relative bg-white/10 hover:bg-white/20 text-white",
        custom_collection: "relative bg-[#0b121c] text-[#5BA1FE]",
        custom_filter:
          "relative text-primary-violet before:bg-primary-violet/10 before:hover:bg-primary-violet/20",
        custom_submit_primary:
          "relative before:bg-primary-green text-white before:hover:bg-primary-green/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        vsm: "h-7 px-3 text-xs",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        custom_primary: "px-3 py-2.5 w-max text-xs sm:text-sm",
        custom_secondary: "h-10 px-6 w-full text-xs sm:text-sm",
        custom_sm: "h-10 px-4 w-max text-xs sm:text-sm",
        custom_link_primary: "px-3 py-1.5 w-max text-xs sm:text-sm",
        custom_link_secondary:
          "px-2 py-1 sm:px-3 sm:py-1.5 w-max text-xs sm:text-sm",
        custom_icon: "h-8 w-8 md:h-10 md:w-10",
        custom_tertiary: "px-3 py-1 w-max text-sm",
        custom_collection: "h-7 sm:h-10 px-2 w-max text-[10px] sm:text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
