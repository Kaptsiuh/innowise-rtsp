import { client } from "@/shared/api/client";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";

export const useProduct = (productId: string | number) => {
  const id = Number(productId);
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await client.GET("/products/{product_id}", {
        params: { path: { product_id: id } },
      });
      if (error) throw new Error("Failed to fetch product");
      return data as Product;
    },
    enabled: !isNaN(id) && id > 0,
  });
};
