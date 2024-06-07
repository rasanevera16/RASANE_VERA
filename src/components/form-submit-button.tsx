"use client";

import { useFormStatus } from "react-dom";

import { LoadingButton } from "./loading-button";

interface FormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "custom_default"
    | "custom_primary"
    | "custom_outline_primary"
    | "custom_outline_secondary"
    | "custom_bookmark"
    | "custom_social"
    | "custom_tertiary"
    | "custom_collection"
    | "custom_outline_tertiary"
    | "custom_link_primary"
    | "custom_link_secondary"
    | "custom_filter"
    | "custom_submit_primary";
  size:
    | "default"
    | "sm"
    | "lg"
    | "icon"
    | "custom_primary"
    | "custom_secondary"
    | "custom_sm"
    | "custom_link_primary"
    | "custom_link_secondary"
    | "custom_icon"
    | "custom_tertiary"
    | "custom_collection"
    | "vsm";
  loadingType: "submit" | "collection";
}

export const FormSubmitButton = ({
  variant,
  size,
  loadingType,
  ...props
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton
      loading={pending}
      variant={variant}
      size={size}
      loadingType={loadingType}
      {...props}
      type="submit"
    />
  );
};
