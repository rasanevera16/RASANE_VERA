import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CustomAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  classNameAvatarImage?: string;
  fallback?: React.ReactNode;
  classNameAvatarFallback?: string;
}

export const CustomAvatar = ({
  src,
  alt,
  className,
  classNameAvatarImage,
  fallback,
  classNameAvatarFallback,
}: CustomAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7", className)}>
      <AvatarImage
        src={src || ""}
        alt={alt || ""}
        className={cn("object-cover object-center", classNameAvatarImage)}
      />
      <AvatarFallback className={cn(classNameAvatarFallback)}>
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};
