"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Info, Check, X, CircleDotDashed } from "lucide-react";
import { useRouter } from "next-nprogress-bar";

import { OrderSchema, OrderValues } from "@/schemas/order-schema";
import { InsertOrderValues, statusEnum } from "@/server/drizzle/schema";
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
import { Container } from "../ui/container";
import { Button } from "../ui/button";
import { CardWrapperForm } from "../card-wrapper-form";
import { DatePicker } from "../ui/date-picker";
import { TProductWithImages } from "@/types/product-type";
import { useOrderedStore } from "@/stores/ordered-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { OrderedProductForm } from "./ordered-product-form";

interface OrderFormProps {
  defaultValues?: OrderValues;
  onSubmit(values: InsertOrderValues): void;
  disabled?: boolean;
  loading?: boolean;
  products: TProductWithImages[];
}

const orderStatus = [
  {
    label: "Pending",
    value: "pending",
    icon: CircleDotDashed,
  },
  {
    label: "Succeeded",
    value: "succeeded",
    icon: Check,
  },
  {
    label: "Cancelled",
    value: "cancelled",
    icon: X,
  },
];

const OrderForm = ({
  defaultValues,
  onSubmit,
  disabled,
  loading,
  products,
}: OrderFormProps) => {
  const [selectedProduct, setSelectedProduct] =
    useState<TProductWithImages | null>(null);

  const ordered = useOrderedStore();
  const router = useRouter();

  const form = useForm<OrderValues>({
    defaultValues,
    resolver: zodResolver(OrderSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isDirty },
  } = form;

  useEffect(() => {
    setValue("status", statusEnum.enumValues[0] || "pending");
  }, [setValue]);

  const totalPrice = ordered.items.reduce((acc, curr) => {
    return acc + (curr?.price || 0) * curr.orderItem.quantity;
  }, 0);

  const totalOrder = ordered.items.reduce(
    (acc, curr) => acc + curr.orderItem.quantity,
    0,
  );

  const handleSubmitForm = async (values: OrderValues) => {
    onSubmit({
      ...values,
      totalPrice,
      totalOrder,
      status: values.status,
      orderItems: ordered.items.map((item) => ({
        productId: item.id,
        quantity: item.orderItem.quantity,
      })),
    });
    ordered.removeAll();
  };

  const handleBack = () => {
    router.push("/manage-orders", undefined, { showProgressBar: true });
  };

  const onItemClick = (data: TProductWithImages) => {
    setSelectedProduct(data === selectedProduct ? null : data);
  };

  const onAddOrderedProduct = () => {
    ordered.addItem({
      ...selectedProduct!,
      orderItem: {
        quantity: 1,
      },
    });
    setSelectedProduct(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSubmitForm)} autoComplete="off">
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
                  <Heading title="Create a New Order Data" />
                </div>
                <div className="flex items-center gap-2">
                  <LoadingButton
                    variant="custom_submit_primary"
                    size="vsm"
                    type="submit"
                    className="ml-auto h-8 w-max"
                    loadingType="submit"
                    loading={loading!}
                    disabled={loading! || !isValid || !isDirty}
                  >
                    Create Order Data
                  </LoadingButton>
                </div>
              </div>
            </Container>
          </div>
        </div>
        <Container>
          <div className="my-14 flex flex-col gap-3">
            {/* Information Section */}
            <CardWrapperForm headerLabel="Informasi Penting">
              <h4 className="mb-2 text-sm text-gray-700">
                Tambahkan data pesanan baru dimana pelanggan telah membeli
                produk yang terdapat di katalog.
              </h4>

              <span className="text-xs font-medium italic text-gray-700">
                Bidang yang harus diisi ditandai dengan tanda bintang (*).
              </span>
            </CardWrapperForm>

            {/* Form Section */}
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-12">
              <div className="space-y-3 md:col-span-5">
                {/* Order Detail Form Section */}
                <CardWrapperForm headerLabel="Detail Pesanan">
                  <div className="space-y-4">
                    <FormField
                      name="customerName"
                      control={control}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel
                            variant="primary"
                            className={cn(
                              "wblock w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                              errors.customerName && "text-destructive",
                            )}
                          >
                            Nama Pelanggan
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              variant="primary"
                              size="primary"
                              className={cn(
                                "text-primary hover:border-primary-violet hover:ring-primary-violet focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0",
                                errors.customerName &&
                                  "hover:border-destructive hover:ring-destructive focus:border-destructive focus-visible:ring-destructive",
                              )}
                              placeholder="Yacob sayuri"
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
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel
                            variant="primary"
                            className={cn(
                              "block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']",
                              errors.date && "text-destructive",
                            )}
                          >
                            Tanggal Pemesanan
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                              disabled={disabled}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardWrapperForm>
              </div>
              <div className="space-y-3 md:col-span-7">
                {/* Ordererd Products Form Section */}
                <CardWrapperForm
                  headerLabel="Produk yang Dipesan"
                  information={[
                    "Tambahkan produk yang telah dibeli oleh pelanggan.",
                    "Kamu dapat menambahkan beberapa produk.",
                    "Jika kamu ingin menghapus suatu produk, kamu dapat mengklik tombol minus di sebelah kanan produk.",
                    "Jika ingin menambah produk yang sudah ditambahkan, maka hanya kuantitasnya saja yang akan diperbarui.",
                  ]}
                  icon={<Info className="size-4" />}
                  showInfo
                >
                  <OrderedProductForm
                    products={products}
                    ordered={ordered}
                    onItemClick={onItemClick}
                    onAddOrderedProduct={onAddOrderedProduct}
                    selectedProduct={selectedProduct}
                    totalOrder={totalOrder}
                    totalPrice={totalPrice}
                  />
                </CardWrapperForm>

                {/* Order Status Section */}
                <CardWrapperForm
                  headerLabel="Status Pesanan"
                  information={[
                    "Tetapkan status pesanan yang telah dibuat oleh pelanggan.",
                  ]}
                  icon={<Info className="size-4" />}
                  showInfo
                >
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel
                          variant="primary"
                          className="block w-max cursor-pointer text-primary after:ml-1 after:text-red-500 after:content-['*']"
                        >
                          Status Pesanan
                        </FormLabel>
                        <Select
                          disabled={disabled}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-lg ring-offset-0 focus:ring-0 focus:ring-offset-0">
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Pilih Status Pesanan"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(orderStatus).map((status, index) => (
                              <SelectItem
                                key={index}
                                value={status.value}
                                className="normal-case"
                              >
                                {field.value === status.value ? (
                                  <div className="flex items-center gap-2 text-left">
                                    <status.icon className="size-4" />

                                    <h3 className="text-sm font-medium text-black">
                                      {status.label}
                                    </h3>
                                  </div>
                                ) : (
                                  <div className="flex flex-row items-center gap-2">
                                    <div className="mt-1">
                                      <status.icon className="size-4" />
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-medium text-black">
                                        {status.label}
                                      </h3>
                                    </div>
                                  </div>
                                )}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
  );
};

export default OrderForm;
