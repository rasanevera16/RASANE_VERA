import { Metadata } from "next";

import NewOrder from "@/components/orders/new-order";
import { getProducts } from "@/server/data/product";

export const metadata: Metadata = {
  title: "Create a New Order Data",
  description: "Add a New Order Data",
};

const NewOrderPage = async () => {
  const products = await getProducts();

  return <NewOrder products={products} />;
};

export default NewOrderPage;
