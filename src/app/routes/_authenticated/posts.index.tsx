import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/")({
  component: lazyRouteComponent(() => import("@/pages/posts-page"), "PostsPage"),
});
