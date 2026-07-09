import { Header } from "../../shared/components";
import { Outlet } from "@tanstack/react-router";

export const RootLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);
