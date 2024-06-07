"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { AboutSchema, AboutValues } from "@/schemas/about-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { CardWrapperForm } from "../card-wrapper-form";
import { InsertAboutValues } from "@/server/drizzle/schema";
import { Button } from "../ui/button";
import { LoadingButton } from "../loading-button";

interface VisionFormProps {
  initialData: string;
  onSubmit(values: InsertAboutValues["vision"]): void;
  loadingEditVision?: boolean;
}

export const VisionForm = ({
  initialData,
  onSubmit,
  loadingEditVision,
}: VisionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const visionRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<Pick<AboutValues, "vision">>({
    defaultValues: {
      vision: initialData || "",
    },

    resolver: zodResolver(AboutSchema.pick({ vision: true })),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful, dirtyFields },
  } = form;

  const visionValue = getValues("vision");

  const autoResizeTextarea = () => {
    if (visionRef.current) {
      const textarea = visionRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [visionValue]);

  useEffect(() => {
    if (isEditing) {
      autoResizeTextarea();
    }
  }, [isEditing, visionValue]);

  const handleSubmitForm = (values: Pick<AboutValues, "vision">) => {
    onSubmit(values.vision);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <CardWrapperForm
      headerLabel="Visi Rasane Vera"
      showEditButton
      onEditing={
        isEditing
          ? () => {
              setIsEditing(false);
              reset({
                vision: initialData,
              });
            }
          : () => setIsEditing(true)
      }
    >
      {!isEditing && (
        <p className="whitespace-pre-line break-words text-sm">{initialData}</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
            <FormField
              name="vision"
              control={control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    variant="primary"
                    className={cn(
                      "lock w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                      errors.vision && "text-destructive",
                    )}
                  >
                    Visi
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className={cn(
                        "resize-none overflow-hidden hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                        errors.vision &&
                          "text-red-400 hover:border-destructive hover:ring-destructive focus:border-destructive focus:text-red-400 focus-visible:ring-destructive",
                      )}
                      placeholder="What is Rasane Vera about?"
                      {...field}
                      ref={visionRef}
                      rows={1}
                      onBlur={field.onBlur}
                      disabled={loadingEditVision!}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-row gap-3">
              <Button
                variant="custom_outline"
                size="sm"
                type="button"
                className="relative w-full"
                onClick={() => {
                  setIsEditing(false);
                  reset({
                    vision: initialData,
                  });
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="custom_submit_primary"
                size="sm"
                loading={loadingEditVision!}
                type="submit"
                className="w-full"
                loadingType="submit"
                disabled={!Object.keys(dirtyFields).length}
              >
                Save
              </LoadingButton>
            </div>
          </form>
        </Form>
      )}
    </CardWrapperForm>
  );
};
