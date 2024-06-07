"use client";

import { TOrderWithOrderItem } from "@/types/order-type";
import { DataTable } from "../ui/data-table";
import { useBulkDeleteOrders } from "@/features/orders/use-bulk-delete-order";
import { columns } from "./columns";

interface OrdersProps {
  data: TOrderWithOrderItem[];
}

const Orders = ({ data }: OrdersProps) => {
  const { statusBulkDeleteOrder, executeBulkDeleteOrder } =
    useBulkDeleteOrders();

  return (
    <DataTable
      filterKey="customerName"
      columns={columns}
      data={data}
      onDelete={(row) => {
        const ids = row.map((r) => r.original.id);

        executeBulkDeleteOrder({ ids });
      }}
      disabled={statusBulkDeleteOrder === "executing"}
      loading={statusBulkDeleteOrder === "executing"}
      labelBulkDelete="Orders"
      showFilter
      showPagination
    />
  );
};

export default Orders;
