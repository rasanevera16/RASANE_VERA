"use client";

import { Package, PackageOpen, ShoppingBasket, Wallet } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { CountUp } from "../count-up";
import { DataCard } from "./data-card";

interface DataGridProps {
  totalRevenue: number;
  totalOrders: number;
  productSold: number;
  productStock: number;
}

export const DataGrid = ({
  totalRevenue,
  productSold,
  productStock,
  totalOrders,
}: DataGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
      <DataCard title="Total Pendapatan" icon={Wallet} variant="default">
        <h1 className="line-clamp-1 break-all text-base font-bold">
          <CountUp
            preserveValue
            start={0}
            end={totalRevenue}
            formattingFn={formatCurrency}
          />
        </h1>
      </DataCard>
      <DataCard title="Total Pemesanan" icon={ShoppingBasket} variant="default">
        <h1 className="line-clamp-1 break-all text-base font-bold">
          <CountUp preserveValue start={0} end={totalOrders} />
        </h1>
      </DataCard>
      <DataCard title="Produk Dijual" icon={PackageOpen} variant="default">
        <h1 className="line-clamp-1 break-all text-base font-bold">
          <CountUp preserveValue start={0} end={productSold} />
        </h1>
      </DataCard>
      <DataCard title="Produk Dalam Stok" icon={Package} variant="default">
        <h1 className="line-clamp-1 break-all text-base font-bold">
          <CountUp preserveValue start={0} end={productStock} />
        </h1>
      </DataCard>
    </div>
  );
};
