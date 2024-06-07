"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AboutSchema, AboutValues } from "@/schemas/about-schema";
import { InsertAboutValues } from "@/server/drizzle/schema";
import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Container } from "../ui/container";
import { CardWrapperForm } from "../card-wrapper-form";
import { Textarea } from "../ui/textarea";

interface NewAboutFormProps {
  defaultValues?: AboutValues;
  onSubmit(values: InsertAboutValues): void;
  loading?: boolean;
}

export const NewAboutForm = ({
  defaultValues,
  onSubmit,
  loading,
}: NewAboutFormProps) => {
  const form = useForm<AboutValues>({
    defaultValues,
    resolver: zodResolver(AboutSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = form;

  const handleSubmitForm = (values: AboutValues) => {
    onSubmit(values);
  };

  return (
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
                      "focus-visible:ring- hover:border-destructive hover:ring-destructive focus:border-destructive",
                  )}
                  placeholder="https://www.youtube.com/watch?v=..."
                  {...field}
                  onBlur={field.onBlur}
                  disabled={loading!}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel
                variant="primary"
                className={cn(
                  "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                  errors.description && "text-destructive",
                )}
              >
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className={cn(
                    "min-h-14 resize-none scrollbar-hide hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                    errors.description &&
                      "text-red-400 hover:border-destructive hover:ring-destructive focus:border-destructive focus:text-red-400 focus-visible:ring-destructive",
                  )}
                  placeholder="Apa itu Rasane Vera?"
                  {...field}
                  onBlur={field.onBlur}
                  disabled={loading!}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="vision"
          control={control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel
                variant="primary"
                className={cn(
                  "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                  errors.vision && "text-destructive",
                )}
              >
                Vision
              </FormLabel>
              <FormControl>
                <Textarea
                  className={cn(
                    "min-h-14 resize-none scrollbar-hide hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                    errors.vision &&
                      "text-red-400 hover:border-destructive hover:ring-destructive focus:border-destructive focus:text-red-400 focus-visible:ring-destructive",
                  )}
                  placeholder="Apa visi dari Rasane Vera?"
                  {...field}
                  onBlur={field.onBlur}
                  disabled={loading!}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
                Mission
              </FormLabel>
              <FormControl>
                <Textarea
                  className={cn(
                    "min-h-14 resize-none scrollbar-hide hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                    errors.mission &&
                      "text-red-400 hover:border-destructive hover:ring-destructive focus:border-destructive focus:text-red-400 focus-visible:ring-destructive",
                  )}
                  placeholder="Apa misi dari Rasane Vera?"
                  {...field}
                  onBlur={field.onBlur}
                  disabled={loading!}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          variant="custom_submit_primary"
          size="sm"
          type="submit"
          className="w-full"
          loadingType="submit"
          loading={loading!}
          disabled={loading! || !isValid || !isDirty}
        >
          Save
        </LoadingButton>
      </form>
    </Form>
  );
};
