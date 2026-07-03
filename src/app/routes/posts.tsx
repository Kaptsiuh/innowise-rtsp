import { PostsPage } from "@/pages/posts-page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  component: PostsPage,
  beforeLoad: () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
});
