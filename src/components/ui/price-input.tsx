"use client";

import * as React from "react";
import CurrencyInput from "react-currency-input-field";

import { cn } from "@/lib/utils";

interface PriceInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  onBlur: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const PriceInput = React.forwardRef<HTMLInputElement, PriceInputProps>(
  (
    { value, onChange, onBlur, placeholder, disabled, className, ...props },
    ref,
  ) => {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-sm">
          Rp.
        </div>
        <CurrencyInput
          className={cn(
            "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 ps-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          placeholder={placeholder}
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          allowDecimals={false}
          groupSeparator="."
          decimalSeparator=","
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

PriceInput.displayName = "PriceInput";

export { PriceInput };
