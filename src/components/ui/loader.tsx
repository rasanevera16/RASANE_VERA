import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps extends React.SVGProps<SVGSVGElement> {}

export const Loader = ({ className }: LoaderProps) => {
  return <Loader2 className={cn("size-5 animate-spin", className)} />;
};
