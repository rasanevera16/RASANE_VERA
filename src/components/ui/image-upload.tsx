"use client";

import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "./button";
import { UploadDropzone } from "@/lib/uploadthing";
import { Loader } from "./loader";
import { ProductValues } from "@/schemas/product-schema";
import { Skeleton } from "./skeleton";

interface ImageUploadProps {
  value: { name: string; url: string }[];
  onRemove: (value: string) => void;
}

export const ImageUpload = ({ value, onRemove }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const { getValues, control, setError, formState } =
    useFormContext<ProductValues>();
  const { append, update } = useFieldArray({
    control,
    name: "productImages",
  });

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

  if (!value) {
    return (
      <>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              className="aspect-video h-auto w-full overflow-hidden rounded-l"
              key={index}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!formState.errors.productImages && value && (
        <div className="grid grid-cols-2 gap-2">
          {value.map((img, index) => (
            <div
              key={index}
              className="relative aspect-video h-auto w-full overflow-hidden rounded-lg"
            >
              <div className="absolute right-1 top-1 z-[5]">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => onRemove(img.url)}
                  className="relative h-7 w-7"
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
              <Image
                fill
                className="object-cover object-center"
                alt={img.name}
                src={img.url}
              />
            </div>
          ))}
        </div>
      )}
      <UploadDropzone
        className="mt-0"
        endpoint="productImages"
        onUploadError={(error: Error) => {
          if (error) {
            setError("productImages", {
              type: "validate",
              message: error.message,
            });
          } else {
            setError("productImages", {
              message: "",
            });
          }

          return;
        }}
        onBeforeUploadBegin={(res) => {
          res.map((img) =>
            append({
              name: img.name,
              url: URL.createObjectURL(img),
            }),
          );

          return res;
        }}
        onClientUploadComplete={(files) => {
          const images = getValues("productImages");
          images.map((field, imgIDX) => {
            if (field.url.search("blob:") === 0) {
              const image = files.find((img) => img.name === field.name);
              if (image) {
                update(imgIDX, {
                  url: image.url,
                  name: image.name,
                });
              }
            }
          });
          return;
        }}
      />
    </div>
  );
};
