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

interface MissionFormProps {
  initialData: string;
  onSubmit(values: InsertAboutValues["mission"]): void;
  loadingEditMission?: boolean;
}

export const MissionForm = ({
  initialData,
  onSubmit,
  loadingEditMission,
}: MissionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const missionRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<Pick<AboutValues, "mission">>({
    defaultValues: {
      mission: initialData || "",
    },

    resolver: zodResolver(AboutSchema.pick({ mission: true })),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful, dirtyFields },
  } = form;

  const missionValue = getValues("mission");

  const autoResizeTextarea = () => {
    if (missionRef.current) {
      const textarea = missionRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [missionValue]);

  useEffect(() => {
    if (isEditing) {
      autoResizeTextarea();
    }
  }, [isEditing, missionValue]);

  const handleSubmitForm = (values: Pick<AboutValues, "mission">) => {
    onSubmit(values.mission);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <CardWrapperForm
      headerLabel="Misi Rasane Vera"
      showEditButton
      onEditing={
        isEditing
          ? () => {
              setIsEditing(false);
              reset({
                mission: initialData,
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
              name="mission"
              control={control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    variant="primary"
                    className={cn(
                      "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                      errors.mission && "text-destructive",
                    )}
                  >
                    Misi
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className={cn(
                        "resize-none overflow-hidden hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                        errors.mission &&
                          "text-red-400 hover:border-destructive hover:ring-destructive focus:border-destructive focus:text-red-400 focus-visible:ring-destructive",
                      )}
                      placeholder="What is Rasane Vera about?"
                      {...field}
                      ref={missionRef}
                      rows={1}
                      onBlur={field.onBlur}
                      disabled={loadingEditMission!}
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
                    mission: initialData,
                  });
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="custom_submit_primary"
                size="sm"
                loading={loadingEditMission!}
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
