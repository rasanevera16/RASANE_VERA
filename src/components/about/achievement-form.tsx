"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AboutAchievementSchema,
  AboutAchievementValues,
} from "@/schemas/about-achievement-schema";
import { InsertAboutAchievementValues } from "@/server/drizzle/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/loading-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useModalStore } from "@/stores/modal-store";

interface AchievementFormProps {
  id?: string;
  defaultValues?: AboutAchievementValues;
  onSubmit(values: InsertAboutAchievementValues): void;
  onDelete?(): void;
  loading?: boolean;
  loadingDelete?: boolean;
}

export const AchievementForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  loading,
  loadingDelete,
}: AchievementFormProps) => {
  const { onOpen } = useModalStore();

  const form = useForm<AboutAchievementValues>({
    defaultValues,
    resolver: zodResolver(AboutAchievementSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = form;

  const handleSubmitForm = (values: AboutAchievementValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <FormField
          name="count"
          control={control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel
                variant="primary"
                className={cn(
                  "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                  errors.count && "text-destructive",
                )}
              >
                Jumlah Pencapaian
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  variant="primary"
                  size="primary"
                  className={cn(
                    "text-primary hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                    errors.count &&
                      "hover:border-destructive hover:ring-destructive focus:border-destructive focus-visible:ring-destructive",
                  )}
                  placeholder="0"
                  min={0}
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
          name="title"
          control={control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel
                variant="primary"
                className={cn(
                  "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                  errors.title && "text-destructive",
                )}
              >
                Judul Pencapaian
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  variant="primary"
                  size="primary"
                  className={cn(
                    "text-primary hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                    errors.title &&
                      "hover:border-destructive hover:ring-destructive focus:border-destructive focus-visible:ring-destructive",
                  )}
                  placeholder="Judul pencapaian..."
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
                Deskripsi Pencapaian
              </FormLabel>
              <FormControl>
                <Textarea
                  className={cn(
                    "min-h-36 resize-none scrollbar-hide hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                    errors.description &&
                      "text-red-400 hover:border-destructive hover:ring-destructive focus:border-destructive focus:text-red-400 focus-visible:ring-destructive",
                  )}
                  placeholder="Bagaimana cara mencapai pencapaian ini?"
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
          {id ? "Save Changes" : "Save Achievement"}
        </LoadingButton>

        {id && (
          <Button
            className="relative w-full"
            variant="destructive"
            size="sm"
            type="button"
            onClick={() =>
              onOpen("delete", {
                title: "Apakah kamu yakin?",
                message: (
                  <>
                    Apakah kamu yakin ingin menghapus pencapaian ini? Pencapaian{" "}
                    <span className="font-semibold text-primary-purple">
                      {defaultValues?.title}
                    </span>{" "}
                    akan dihapus secara permanen. Tindakan ini tidak bisa
                    dibatalkan.
                  </>
                ),
                onDelete: onDelete!,
                loading: loadingDelete!,
              })
            }
          >
            Delete Achievement
          </Button>
        )}
      </form>
    </Form>
  );
};
