import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { TProductWithImages } from "@/types/product-type";
import { TOrderItem } from "@/types/order-type";

type TOrderedItem = TProductWithImages & {
  orderItem: Pick<TOrderItem, "quantity">;
};

export interface OrderedStore {
  items: TOrderedItem[];
  addItem: (data: TOrderedItem) => void;
  removeItem: (data: TOrderedItem) => void;
  removeAll: () => void;
  existingItem: (id: string) => boolean;
}

export const useOrderedStore = create(
  persist<OrderedStore>(
    (set, get) => ({
      items: [],
      addItem: (data) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === data.id);
          if (existingItem) {
            const updatedOrdered = state.items.map((item) => {
              if (item.id === data.id) {
                return {
                  ...item,
                  orderItem: {
                    ...item.orderItem,
                    quantity: item.orderItem.quantity + data.orderItem.quantity,
                  },
                };
              }
              return item;
            });
            return { items: updatedOrdered };
          } else {
            return {
              items: [
                ...state.items,
                {
                  ...data,
                  orderItem: {
                    quantity: data.orderItem.quantity,
                  },
                },
              ],
            };
          }
        }),
      removeItem: (data) =>
        set((state) => {
          const updatedOrdered = state.items.map((item) => {
            if (item.id === data.id) {
              return {
                ...item,
                orderItem: {
                  ...item.orderItem,
                  quantity: item.orderItem.quantity - 1,
                },
              };
            }
            return item;
          });
          return {
            items: updatedOrdered.filter((item) => item.orderItem.quantity > 0),
          };
        }),
      removeAll: () => set({ items: [] }),
      existingItem: (id: string) =>
        get().items.find((item) => item.id === id) !== undefined,
    }),
    {
      name: "ordered-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
