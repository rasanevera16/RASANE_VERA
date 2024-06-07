import { cn } from "@/lib/utils";

interface TiptapFormatProps {
  description: string;
  className?: string;
}

export const TiptapFormat = ({ description, className }: TiptapFormatProps) => {
  return (
    <div
      className={cn("ProseMirror", className)}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};
