import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface CardWrapperFormProps {
  children: React.ReactNode;
  headerLabel?: string;
  information?: Array<string>;
  showInfo?: boolean;
  icon?: React.ReactNode;
  showEditButton?: boolean;
  onEditing?: () => void;
  className?: string;
}

export const CardWrapperForm = ({
  headerLabel,
  children,
  information,
  showInfo,
  icon,
  showEditButton,
  onEditing,
  className,
}: CardWrapperFormProps) => {
  return (
    <Card className={cn("w-full rounded-xl shadow-sm", className)}>
      {headerLabel && (
        <CardHeader className="space-y-2 p-0 pt-3">
          <div className="flex items-center gap-2 px-4">
            <h1 className="text-base font-semibold text-primary">
              {headerLabel}
            </h1>
            {showEditButton && (
              <Button
                variant="ghost"
                size="icon"
                className="relative ml-auto h-8 w-8"
                onClick={onEditing}
              >
                <Edit className="size-4" />
              </Button>
            )}
          </div>
          <Separator />
        </CardHeader>
      )}
      <CardContent className="w-full p-4">{children}</CardContent>
      {showInfo && (
        <>
          <Separator />
          <CardFooter className="p-4 pt-4">
            <div className="flex flex-row flex-wrap gap-2">
              {information?.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 self-start rounded-md border border-input p-2 text-xs text-gray-500"
                >
                  <div>{icon}</div>
                  <span className="flex-1 whitespace-pre-line">{info}</span>
                </div>
              ))}
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
