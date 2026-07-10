import { createApiClient } from "@/shared/api/createApiClient";
import type { ProductsResponse } from "@/shared/types/product";

export const productsApi = createApiClient<ProductsResponse>({
  endpoint: `/products`,
});
