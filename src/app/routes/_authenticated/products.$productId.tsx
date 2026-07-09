import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/products/$productId")({
  component: lazyRouteComponent(() => import("@/pages/product-detail-page"), "ProductDetailPage"),
});
