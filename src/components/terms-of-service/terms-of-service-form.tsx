"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { InsertTermsOfServiceValues } from "@/server/drizzle/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapperForm } from "../card-wrapper-form";
import { Button } from "../ui/button";
import { LoadingButton } from "../loading-button";
import { TiptapFormat } from "../tiptap-format";
import { Tiptap } from "../ui/tiptap";
import { cn } from "@/lib/utils";
import {
  TermOfServiceSchema,
  TermOfServiceValues,
} from "@/schemas/term-of-service-schema";

interface TermsOfServiceFormProps {
  initialData: string;
  onSubmit(values: InsertTermsOfServiceValues): void;
  loading?: boolean;
}

export const TermsOfServiceForm = ({
  initialData,
  onSubmit,
  loading,
}: TermsOfServiceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<TermOfServiceValues>({
    defaultValues: {
      description: initialData || "",
    },

    resolver: zodResolver(TermOfServiceSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful, dirtyFields },
  } = form;

  const handleSubmitForm = (values: TermOfServiceValues) => {
    onSubmit(values);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <CardWrapperForm
      headerLabel="Terms of Service"
      showEditButton
      onEditing={
        isEditing
          ? () => {
              setIsEditing(false);
              reset({
                description: initialData,
              });
            }
          : () => {
              setIsEditing(true);
              reset({
                description: initialData,
              });
            }
      }
    >
      {!isEditing && <TiptapFormat description={initialData} />}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
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
                    Deskripsi Terms of Service
                  </FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
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
                    description: initialData,
                  });
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="custom_submit_primary"
                size="sm"
                loading={loading!}
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
