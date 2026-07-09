import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/products/")({
  component: lazyRouteComponent(() => import("@/pages/products-page"), "ProductsPage"),
});
