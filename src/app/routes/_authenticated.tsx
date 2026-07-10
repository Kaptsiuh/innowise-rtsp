import { tokenStorage } from "@/shared/api/client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: () => <Outlet />,
  beforeLoad: () => {
    const token = tokenStorage.getAccess();
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
});
