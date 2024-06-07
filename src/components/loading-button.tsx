import { Button } from "./ui/button";
import { Loader } from "./ui/loader";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
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

export const LoadingButton = ({
  children,
  loading,
  variant,
  size,
  loadingType,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      disabled={props.disabled || loading}
    >
      {loadingType === "submit" && (
        <div className="relative flex items-center gap-2">
          {loading && <Loader />}
          {children}
        </div>
      )}
      {loadingType === "collection" && (
        <>{loading ? <Loader /> : <>{children}</>}</>
      )}
    </Button>
  );
};
