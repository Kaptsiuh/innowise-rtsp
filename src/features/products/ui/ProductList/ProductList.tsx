import type { Product } from "../types/product";

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  if (!products?.length) {
    return <div>No products found</div>;
  }

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <div>{p.brand}</div>
          <div>{p.description}</div>
          <div>{p.price}</div>
        </li>
      ))}
    </ul>
  );
};
