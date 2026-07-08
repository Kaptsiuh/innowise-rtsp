import { createFileRoute, redirect } from "@tanstack/react-router";
import { ChatPage } from "@/pages/chat-page";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  beforeLoad: () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
});
