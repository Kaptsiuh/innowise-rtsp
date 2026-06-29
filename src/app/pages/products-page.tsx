import { client } from "@/shared/api/client";
import { useQuery } from "@tanstack/react-query";

export const ProductsPage = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return client.GET("/products");
    },
  });

  return (
    <ul>
      {query.data?.data?.products.map((p) => (
        <li key={p.id}>
          <div>{p.brand}</div>
          <div>{p.description}</div>
        </li>
      ))}
    </ul>
  );
};
