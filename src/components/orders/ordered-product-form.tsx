import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, MinusCircle, PlusCircle } from "lucide-react";

import { TProductWithImages } from "@/types/product-type";
import { cn, formatCurrency } from "@/lib/utils";
import { OrderedStore } from "@/stores/ordered-store";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";

interface OrderedProductFormProps {
  ordered: OrderedStore;
  products: TProductWithImages[];
  totalPrice: number;
  totalOrder: number;
  selectedProduct: TProductWithImages | null;
  onItemClick: (data: TProductWithImages) => void;
  onAddOrderedProduct: () => void;
}

export const OrderedProductForm = ({
  products,
  ordered,
  totalPrice,
  totalOrder,
  selectedProduct,
  onItemClick,
  onAddOrderedProduct,
}: OrderedProductFormProps) => {
  const [isMounted, setIsMounted] = useState(false);

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

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-sm font-medium leading-none text-primary">
          <span className="block after:ml-1 after:text-red-500 after:content-['*']">
            Produk yang Dipesan
          </span>
        </h1>
        {ordered.items && ordered.items.length > 0 ? (
          <div className="flex flex-col gap-2">
            {ordered.items.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-wrap items-center gap-2 rounded-lg border border-gray-100 p-2 hover:bg-gray-100/40"
              >
                <div className="flex w-full flex-row items-center gap-3">
                  <div className="flex h-auto w-[20%] flex-col items-center justify-center self-center rounded-lg md:w-[15%]">
                    <div className="relative aspect-video h-auto w-full overflow-hidden">
                      <Image
                        src={item.coverImageUrl}
                        alt={item.coverImageName}
                        fill
                        className="rounded-md object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="flex w-[80%] flex-col items-start gap-2 self-center text-left md:w-[85%]">
                    <div className="space-y-0.5">
                      <h1 className="text-sm font-semibold text-gray-900 md:leading-tight">
                        {item.name}
                      </h1>

                      <h2 className="text-xs font-normal text-gray-700">
                        {formatCurrency(item.price)}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="group relative h-7 w-7 md:h-8 md:w-8"
                    onClick={() => {
                      ordered.removeItem({
                        ...item,
                        orderItem: {
                          quantity: 1,
                        },
                      });
                    }}
                  >
                    <MinusCircle className="size-4 cursor-pointer transition-colors duration-300 group-hover:text-muted-foreground md:size-5" />
                  </Button>
                  <p className="text-md font-bold">{item.orderItem.quantity}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="group relative h-7 w-7 md:h-8 md:w-8"
                    onClick={() => {
                      ordered.addItem({
                        ...item,
                        orderItem: {
                          quantity: 1,
                        },
                      });
                    }}
                  >
                    <PlusCircle className="size-4 cursor-pointer transition-colors duration-300 group-hover:text-muted-foreground md:size-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center rounded-lg border border-input p-2">
            <h1 className="text-sm font-medium text-gray-600">
              Belum ada produk yang ditambahkan.
            </h1>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-medium text-gray-800">
            Total Harga:{" "}
            <span className="font-semibold">{formatCurrency(totalPrice)}</span>
          </div>
          <div className="text-xs font-medium text-gray-800">
            Total Pesanan:{" "}
            <span className="font-semibold"> {totalOrder} barang</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-sm font-medium leading-none text-primary">
          Daftar Produk
        </h1>

        <ul className="flex flex-col gap-2">
          {products.map((product, index) => (
            <li
              key={product.id}
              className={cn(
                "relative cursor-pointer rounded-lg border border-gray-100 p-2 hover:bg-gray-100/40",
                selectedProduct?.id === product.id && "bg-gray-100/40",
              )}
              aria-checked={
                selectedProduct?.id === product.id ? "true" : "false"
              }
              role="radio"
              tabIndex={index}
              onClick={() => onItemClick(product)}
            >
              <div className="flex flex-row items-center gap-3">
                <div className="flex h-auto w-[20%] flex-col items-center justify-center self-center rounded-lg md:w-[15%]">
                  <div className="relative aspect-video h-auto w-full overflow-hidden">
                    <Image
                      src={product.coverImageUrl}
                      alt={product.coverImageName}
                      fill
                      className="rounded-md object-cover object-center"
                    />
                  </div>
                </div>
                <div className="flex w-[80%] flex-col items-start gap-2 self-center text-left md:w-[85%]">
                  <div className="space-y-0.5">
                    <h1 className="text-sm font-semibold text-gray-900 md:leading-tight">
                      {product.name}
                    </h1>

                    <h2 className="text-xs font-normal text-gray-700">
                      {formatCurrency(product.price)}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-2 flex items-center justify-center">
                {selectedProduct?.id === product.id && (
                  <Check className="size-5 text-primary-purple" />
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <Button
            variant="custom_primary"
            size="vsm"
            className="w-max"
            onClick={onAddOrderedProduct}
            type="button"
            disabled={!selectedProduct}
          >
            <span className="relative">Add Ordered Product</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
