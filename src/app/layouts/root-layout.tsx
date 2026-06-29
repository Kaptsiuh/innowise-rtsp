import { Header } from "../../shared/components";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const RootLayout = () => (
  <>
    <Header />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);
