import { ProductDetailPage } from "@/pages/product-detail-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailPage,
});
