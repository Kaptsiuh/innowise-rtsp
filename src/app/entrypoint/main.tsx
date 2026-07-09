import "../styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routes/routeTree.gen.ts";
import { AuthProvider } from "@/shared/api/context/auth-context.tsx";
import { queryClient } from "@/shared/lib/query-client.ts";

const router = createRouter({ routeTree, basepath: "/innowise-rtsp" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
