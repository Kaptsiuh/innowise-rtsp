import { Header } from "../../shared/components";
import { Outlet } from "@tanstack/react-router";

export const RootLayout = () => (
  <>
    <Header />
    <main id="main-content" className="container mx-auto px-4 py-8">
      <Outlet />
    </main>
  </>
);
