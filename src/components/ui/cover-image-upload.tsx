"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Loader } from "./loader";
import { Button } from "./button";
import { Trash } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";

interface CoverImageUploadProps {
  value: string;
  onChange: (values: string) => void;
  onRemove: (value: string) => void;
}

export const CoverImageUpload = ({
  value,
  onChange,
  onRemove,
}: CoverImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const { setError, formState } = useFormContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!formState.errors.coverImageUrl && value) {
    return (
      <div className="relative aspect-video h-auto w-full overflow-hidden rounded-lg">
        <div className="absolute right-2 top-2 z-[5]">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => onRemove(value)}
            className="relative h-8 w-8"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <Image
          fill
          className="object-cover object-center"
          alt={value}
          src={value}
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      className="mt-0"
      endpoint="coverProductImage"
      onUploadError={(error: Error) => {
        if (error) {
          setError("coverImageUrl", {
            type: "validate",
            message: error.message,
          });
        } else {
          setError("coverImageUrl", {
            message: "",
          });
        }

        return;
      }}
      onBeforeUploadBegin={async (res) => {
        return res;
      }}
      onClientUploadComplete={(res) => {
        onChange(res[0].url);
        return;
      }}
    />
  );
};
