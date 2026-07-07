import { ProductsPage } from "@/pages/products-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/")({
  component: ProductsPage,
});
