import { PostDetailPage } from "@/pages/post-detail-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: PostDetailPage,
});
