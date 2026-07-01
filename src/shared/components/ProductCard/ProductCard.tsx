import type { Product } from "@/features/products/types/product";
import { Button } from "../ui/button";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const discount = Math.floor(product.discountPercentage) > 0;
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <li className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {discount && (
          <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-2 left-2 rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-white">
            Last chance!
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute bottom-2 left-2 rounded bg-gray-600 px-2 py-1 text-xs font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-xs text-gray-500">{product.brand}</div>
        <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
          {product.title}
        </h3>
        <div className="mb-2 flex items-center gap-1 text-sm">
          <span className="text-yellow-500">★</span>
          <span className="font-medium">{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-auto">
          {discount ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-red-600">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          )}
          <Button className="mt-3 w-full" disabled={product.stock === 0}>
            {product.stock === 0 ? "Out of stock" : "Add to cart"}
          </Button>
        </div>
      </div>
    </li>
  );
};
