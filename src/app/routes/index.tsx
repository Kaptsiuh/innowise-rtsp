import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProductsPage } from "../../pages/products-page";

export const Route = createFileRoute("/")({
  component: ProductsPage,
  beforeLoad: () => {
    throw redirect({ to: "/products" });
  },
});
