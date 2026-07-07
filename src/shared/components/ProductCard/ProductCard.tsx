import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Route } from "@/app/routes/products.$productId";
import { cn } from "@/shared/lib/utils";
import type { Product } from "@/features/products/types/product";

type Props = {
  product: Product;
  variant?: "card" | "detail";
};

export const ProductCard = ({ product, variant = "card" }: Props) => {
  const isDetail = variant === "detail";
  const discount = Math.floor(product.discountPercentage) > 0;
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const renderContent = () => (
    <>
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
        <h3
          className={cn(
            "font-semibold text-gray-900",
            isDetail ? "text-2xl mb-2" : "text-sm mb-2 line-clamp-2",
          )}
        >
          {product.title}
        </h3>
        <div className="mb-2 flex items-center gap-1 text-sm">
          <span
            className={
              product.rating >= 4
                ? "text-green-500"
                : product.rating >= 3
                  ? "text-yellow-500"
                  : "text-red-500"
            }
          >
            ★
          </span>
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
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {isDetail && (
          <div className="space-y-4 text-gray-700">
            <p className="text-base">{product.description}</p>
            <div className="grid gap-2">
              <div>
                <span className="font-medium">Category:</span>{" "}
                {product.category}
              </div>
              <div>
                <span className="font-medium">Stock:</span> {product.stock}
              </div>
              <div>
                <span className="font-medium">Shipping:</span>{" "}
                {product.shippingInformation}
              </div>
              <div>
                <span className="font-medium">Warranty:</span>{" "}
                {product.warrantyInformation}
              </div>
              {product.weight && (
                <div>
                  <span className="font-medium">Weight:</span> {product.weight}{" "}
                  kg
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

  const renderAddToCartButton = () => (
    <div className="p-4 pt-0">
      <Button
        className="w-full"
        disabled={product.stock === 0}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {product.stock === 0 ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  );

  const wrapper =
    "group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg";

  return isDetail ? (
    <div className={wrapper}>
      {renderContent()}
      {renderAddToCartButton()}
    </div>
  ) : (
    <li className="list-none">
      <div className={wrapper}>
        <Link
          to={Route.to}
          params={{ productId: String(product.id) }}
          className="block h-full"
        >
          {renderContent()}
        </Link>
        {renderAddToCartButton()}
      </div>
    </li>
  );
};
