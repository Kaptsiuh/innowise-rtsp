import { PostsPage } from "@/pages/posts-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Posts/")({
  component: PostsPage,
});
