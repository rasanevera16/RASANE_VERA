"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { InsertAboutValues } from "@/server/drizzle/schema";
import { AboutSchema, AboutValues } from "@/schemas/about-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CardWrapperForm } from "../card-wrapper-form";
import { Button } from "../ui/button";
import { LoadingButton } from "../loading-button";
import { VideoPlayer } from "../video-player";
import { Input } from "../ui/input";

interface YoutubeUrlFormProps {
  initialData: string;
  onSubmit(values: InsertAboutValues["youtubeUrl"]): void;
  loadingEditYoutubeUrl?: boolean;
}

export const YoutubeUrlForm = ({
  initialData,
  onSubmit,
  loadingEditYoutubeUrl,
}: YoutubeUrlFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<Pick<AboutValues, "youtubeUrl">>({
    defaultValues: {
      youtubeUrl: initialData || "",
    },

    resolver: zodResolver(AboutSchema.pick({ youtubeUrl: true })),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful, dirtyFields },
  } = form;

  const handleSubmitForm = (values: Pick<AboutValues, "youtubeUrl">) => {
    onSubmit(values.youtubeUrl);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        youtubeUrl: initialData,
      });
    }
  }, [initialData, isSubmitSuccessful, reset]);

  return (
    <CardWrapperForm
      headerLabel="Youtube Tentang Rasane Vera"
      showEditButton
      onEditing={
        isEditing
          ? () => {
              setIsEditing(false);
              reset({
                youtubeUrl: initialData,
              });
            }
          : () => {
              setIsEditing(true);
              reset({
                youtubeUrl: initialData,
              });
            }
      }
    >
      {!isEditing && (
        <div className="aspect-video h-full w-full overflow-hidden rounded-xl">
          <VideoPlayer url={initialData} />
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
            <FormField
              name="youtubeUrl"
              control={control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    variant="primary"
                    className={cn(
                      "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                      errors.youtubeUrl && "text-destructive",
                    )}
                  >
                    Youtube URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      variant="primary"
                      size="primary"
                      className={cn(
                        "text-primary hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                        errors.youtubeUrl &&
                          "hover:border-destructive hover:ring-destructive focus:border-destructive focus-visible:ring-destructive",
                      )}
                      placeholder="https://www.youtube.com/watch?v=..."
                      {...field}
                      onBlur={field.onBlur}
                      disabled={loadingEditYoutubeUrl!}
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
                    youtubeUrl: initialData,
                  });
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="custom_submit_primary"
                size="sm"
                loading={loadingEditYoutubeUrl!}
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
