import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/chat")({
  component: lazyRouteComponent(() => import("@/pages/chat-page"), "ChatPage"),
});
