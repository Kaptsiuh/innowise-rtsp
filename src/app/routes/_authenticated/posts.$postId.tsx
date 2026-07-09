import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/$postId")({
  component: lazyRouteComponent(() => import("@/pages/post-detail-page"), "PostDetailPage"),
});
