import type { ProductsResponse } from "../types/product";
import { createApiClient } from "@/shared/api/createApiClient";

export const productsApi = createApiClient<ProductsResponse>({
  endpoint: `/products`,
});
