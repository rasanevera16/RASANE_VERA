"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, EyeOff, Info, Sparkles, Trash } from "lucide-react";
import { useRouter } from "next-nprogress-bar";

import { ProductSchema, ProductValues } from "@/schemas/product-schema";
import { Heading } from "@/components/ui/heading";
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
import { Checkbox } from "@/components/ui/checkbox";
import { PriceInput } from "../ui/price-input";
import { InsertProductValues } from "@/server/drizzle/schema";
import { useModalStore } from "@/stores/modal-store";
import { Container } from "../ui/container";
import { CardWrapperForm } from "../card-wrapper-form";
import { ImageUpload } from "../ui/image-upload";
import { Tiptap } from "../ui/tiptap";
import { CoverImageUpload } from "../ui/cover-image-upload";
import { Button } from "../ui/button";
import { TProduct, TProductImage } from "@/types/product-type";

interface ProductFormProps {
  id?: string;
  defaultValues?: ProductValues;
  initialData: (TProduct & { productImages: TProductImage[] }) | null;
  onSubmitCreate(values: InsertProductValues): void;
  onSubmitEdit(values: InsertProductValues): void;
  onDelete?(): void;
  disabled?: boolean;
  loading?: boolean;
  loadingDelete?: boolean;
}

export const ProductForm = ({
  id,
  defaultValues,
  initialData,
  onSubmitCreate,
  onSubmitEdit,
  onDelete,
  disabled,
  loading,
  loadingDelete,
}: ProductFormProps) => {
  const { onOpen } = useModalStore();
  const router = useRouter();

  const max_short_description = 50;

  const title = initialData ? "Ubah Produk" : "Tambah Produk Baru";
  const description = initialData
    ? "Ubah produk sesuai dengan kebutuhanmu."
    : "Tambahkan produk baru ke dalam katalog produkmu.";

  const action = initialData ? "Save Changes" : "Create Product";

  const form = useForm<ProductValues>({
    defaultValues,
    resolver: zodResolver(ProductSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors, dirtyFields, isValid, isDirty },
  } = form;

  const handleSubmitForm = async (values: ProductValues) => {
    const price = parseFloat(values.price);

    const isFeatured = Boolean(values.isFeatured);
    const isArchived = Boolean(values.isArchived);

    if (initialData) {
      onSubmitEdit({
        ...values,
        isFeatured,
        isArchived,
        price,
        coverImageName: values.coverImageUrl.split("/").pop()!,
      });
    } else {
      onSubmitCreate({
        ...values,
        isFeatured,
        isArchived,
        price,
        coverImageName: values.coverImageUrl.split("/").pop()!,
      });
    }
  };

  const handleBack = () => {
    router.push("/manage-products", undefined, { showProgressBar: true });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="sticky inset-0 top-12 z-10 h-fit max-h-0 w-full md:top-11">
            <div className="bg-background/95 py-1.5 backdrop-blur supports-[backdrop-filter]:bg-background/75">
              <Container>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-8 w-8"
                      onClick={handleBack}
                      type="button"
                    >
                      <ArrowLeft className="size-4" />
                    </Button>
                    <Heading title={title} />
                  </div>
                  <div className="flex items-center gap-2">
                    <LoadingButton
                      variant="custom_submit_primary"
                      size="vsm"
                      type="submit"
                      className="ml-auto h-8 w-max"
                      loadingType="submit"
                      loading={loading!}
                      disabled={
                        initialData
                          ? !Object.keys(dirtyFields).length ||
                            !isValid ||
                            !isDirty
                          : loading! || !isValid || !isDirty
                      }
                    >
                      {action}
                    </LoadingButton>
                    {initialData && (
                      <Button
                        className="relative h-8 w-max"
                        variant="destructive"
                        size="vsm"
                        type="button"
                        onClick={() =>
                          onOpen("delete", {
                            title: "Are you sure?",
                            message: (
                              <>
                                Apakah kamu yakin ingin menghapus produk ini?
                                Produk{" "}
                                <span className="font-semibold text-primary-purple">
                                  {defaultValues?.name!}
                                </span>{" "}
                                akan dihapus secara permanen. Tindakan ini tidak
                                bisa dibatalkan.
                              </>
                            ),
                            onDelete: onDelete!,
                            loading: loadingDelete!,
                          })
                        }
                      >
                        <Trash className="h-4 w-4" />
                        Delete Product
                      </Button>
                    )}
                  </div>
                </div>
              </Container>
            </div>
          </div>
          <Container>
            <div className="my-14 flex flex-col gap-3">
              {/* Information Section */}
              <CardWrapperForm headerLabel="Informasi Penting">
                <h4 className="mb-2 text-sm text-gray-700">{description}</h4>
                {id && (
                  <span className="text-xs font-medium italic text-gray-700">
                    Bidang yang harus diisi ditandai dengan tanda bintang (*).
                  </span>
                )}
              </CardWrapperForm>

              <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-12">
                <div className="space-y-3 md:col-span-7">
                  {/* Product Details Form Section */}
                  <CardWrapperForm headerLabel="Detail Produk">
                    <div className="space-y-4">
                      <FormField
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <FormItem className="relative space-y-2">
                            <FormLabel
                              variant="primary"
                              className={cn(
                                "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                                errors.name && "text-destructive",
                              )}
                            >
                              Nama Produk
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                variant="primary"
                                size="primary"
                                className={cn(
                                  "text-primary hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                                  errors.name &&
                                    "hover:border-destructive hover:ring-destructive focus:border-destructive focus-visible:ring-destructive",
                                )}
                                placeholder="A cup of aloe vera..."
                                {...field}
                                onBlur={field.onBlur}
                                disabled={disabled}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="price"
                        control={control}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel
                              variant="primary"
                              className={cn(
                                "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                                errors.price && "text-destructive",
                              )}
                            >
                              Harga Produk
                            </FormLabel>
                            <FormControl>
                              <PriceInput
                                className={cn(
                                  "text-primary focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0 group-hover:border-primary-violet group-hover:ring-primary-violet",
                                  errors.price &&
                                    "focus:border-destructive focus-visible:ring-destructive group-hover:border-destructive group-hover:ring-destructive",
                                )}
                                {...field}
                                onBlur={field.onBlur}
                                value={field.value}
                                disabled={disabled}
                                onChange={field.onChange}
                                placeholder="0.00"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardWrapperForm>

                  {/* Product Description Form Section */}
                  <CardWrapperForm
                    headerLabel="Deskripsi Produk"
                    information={[
                      "Deskripsi singkat produk maksimal 20 karakter.",
                      "Spasi tidak dihitung sebagai karakter pada deskripsi singkat.",
                    ]}
                    icon={<Info className="size-4" />}
                    showInfo
                  >
                    <div className="space-y-4">
                      <FormField
                        name="shortDescription"
                        control={control}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FormLabel
                                variant="primary"
                                className={cn(
                                  "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                                  errors.shortDescription ||
                                    (getValues("shortDescription").replace(
                                      /\s/g,
                                      "",
                                    ).length > max_short_description &&
                                      "text-destructive"),
                                )}
                              >
                                Deskripsi Singkat
                              </FormLabel>
                              <div className="ml-auto text-sm font-medium text-gray-700">
                                <span>
                                  {
                                    watch("shortDescription").replace(/\s/g, "")
                                      .length
                                  }
                                </span>
                                /{max_short_description}
                              </div>
                            </div>
                            <FormControl>
                              <Input
                                type="text"
                                variant="primary"
                                size="primary"
                                className={cn(
                                  "text-primary hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                                  errors.shortDescription ||
                                    (getValues("shortDescription").replace(
                                      /\s/g,
                                      "",
                                    ).length > max_short_description &&
                                      "hover:border-destructive hover:ring-destructive focus:border-destructive focus-visible:ring-destructive"),
                                )}
                                placeholder="Deskripsi singkat tentang produk ini..."
                                {...field}
                                onBlur={field.onBlur}
                                disabled={disabled}
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
                                "block w-max text-primary after:ml-1 after:text-red-500 after:content-['*']",
                                errors.description && "text-destructive",
                              )}
                            >
                              Deskripsi Produk
                            </FormLabel>
                            <FormControl>
                              <Tiptap val={field.value} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardWrapperForm>
                </div>

                <div className="space-y-3 md:col-span-5">
                  {/* Product Cover Image Form Section */}
                  <CardWrapperForm
                    headerLabel="Gambar Sampul Produk"
                    information={[
                      "Ukuran maksimal 1MB",
                      "Hanya dapat mengunggah satu gambar sampul produk",
                    ]}
                    icon={<Info className="size-4" />}
                    showInfo
                  >
                    <FormField
                      name="coverImageUrl"
                      control={control}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel
                            variant="primary"
                            className="block w-max text-primary after:ml-1 after:text-red-500 after:content-['*']"
                          >
                            Sampul Gambar
                          </FormLabel>
                          <FormControl>
                            <CoverImageUpload
                              value={field.value}
                              onChange={field.onChange}
                              onRemove={(url) =>
                                field.onChange(field.value !== url)
                              }
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardWrapperForm>

                  {/* Product Images Form Upload Section */}
                  <CardWrapperForm
                    headerLabel="Product Images"
                    information={[
                      "Maksimal 10 gambar per upload",
                      "Ukuran maksimal 1MB per gambar",
                      "Pastikan gambar yang diunggah memiliki kualitas yang baik.",
                      "Gambar harus di kompresi terlebih dahulu sebelum diunggah agar ukuran file tidak terlalu besar.",
                    ]}
                    icon={<Info className="size-4" />}
                    showInfo
                  >
                    <FormField
                      name="productImages"
                      control={control}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel
                            variant="primary"
                            className="lock w-max text-primary after:ml-1 after:text-red-500 after:content-['*']"
                          >
                            Gambar Produk
                          </FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value}
                              onRemove={(url) =>
                                field.onChange([
                                  ...field.value.filter(
                                    (current) => current.url !== url,
                                  ),
                                ])
                              }
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardWrapperForm>

                  {/* Product Setting Section */}
                  <CardWrapperForm
                    headerLabel="Pengaturan Produk"
                    information={[
                      "Produk ini akan muncul di halaman beranda pada bagian unggulan.",
                    ]}
                    icon={<Sparkles className="size-4" />}
                    showInfo
                  >
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="group flex w-full items-center gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              // @ts-ignore
                              onCheckedChange={field.onChange}
                              className="focus-visible:ring-primary-violet group-hover:border-primary-violet group-hover:ring-primary-violet data-[state=checked]:border-primary-violet data-[state=checked]:bg-primary-violet"
                            />
                          </FormControl>

                          <FormLabel
                            variant="primary"
                            className="block cursor-pointer self-center font-semibold text-primary after:ml-1 after:text-xs after:font-normal after:text-gray-500 after:content-['(opsional)']"
                          >
                            Unggulan
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </CardWrapperForm>

                  {/* Product Status Section */}
                  <CardWrapperForm
                    headerLabel="Status Produk"
                    information={[
                      "Produk ini tidak akan muncul di manapun pada katalog produk.",
                    ]}
                    icon={<EyeOff className="size-4" />}
                    showInfo
                  >
                    <FormField
                      control={form.control}
                      name="isArchived"
                      render={({ field }) => (
                        <FormItem className="group flex w-full items-center gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              // @ts-ignore
                              onCheckedChange={field.onChange}
                              className="focus-visible:ring-primary-violet group-hover:border-primary-violet group-hover:ring-primary-violet data-[state=checked]:border-primary-violet data-[state=checked]:bg-primary-violet"
                            />
                          </FormControl>

                          <FormLabel
                            variant="primary"
                            className="block cursor-pointer self-center font-semibold text-primary after:ml-1 after:text-xs after:font-normal after:text-gray-500 after:content-['(opsional)']"
                          >
                            Diarsipkan
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </CardWrapperForm>
                </div>
              </div>
            </div>
          </Container>
        </form>
      </Form>
    </>
  );
};
