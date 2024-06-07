import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container = ({ className, ...props }: ContainerProps) => {
  return <div className={cn("container mx-auto", className)} {...props} />;
};
