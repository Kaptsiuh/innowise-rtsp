import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Route } from "@/app/routes/_authenticated/products.$productId";
import { cn } from "@/shared/lib/utils";
import type { Product } from "@/features/products/types/product";
import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle } from "../";
import { memo } from "react";

type Props = {
  product: Product;
  variant?: "card" | "detail";
};

export const ProductCard = memo(({ product, variant = "card" }: Props) => {
  const isDetail = variant === "detail";
  const discount = Math.floor(product.discountPercentage) > 0;
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  const renderContent = () => (
    <>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {discount && (
          <Badge className="absolute left-2 top-2 bg-red-600 hover:bg-red-700 text-white">
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute bottom-2 left-2 bg-yellow-500 hover:bg-yellow-600 text-white">Last chance!</Badge>
        )}
        {product.stock === 0 && (
          <Badge className="absolute bottom-2 left-2 bg-gray-600 hover:bg-gray-700 text-white">Out of stock</Badge>
        )}
      </div>
      <CardHeader>
        <div className="pt-2 text-xs text-muted-foreground">{product.brand}</div>
        <CardTitle className={cn("font-semibold", isDetail ? "text-2xl" : "text-base line-clamp-2")}>
          {product.title}
        </CardTitle>
        <div className="mb-2 flex items-center gap-1 text-sm">
          <span
            className={
              product.rating >= 4 ? "text-green-500" : product.rating >= 3 ? "text-yellow-500" : "text-red-500"
            }
          >
            ★
          </span>
          <span className="font-medium">{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-auto">
          {discount ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-red-600">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {isDetail && (
          <div className="space-y-4 text-foreground">
            <p className="text-base">{product.description}</p>
            <div className="grid gap-2 text-sm">
              <div>
                <span className="font-medium">Category:</span> {product.category}
              </div>
              <div>
                <span className="font-medium">Stock:</span> {product.stock}
              </div>
              <div>
                <span className="font-medium">Shipping:</span> {product.shippingInformation}
              </div>
              <div>
                <span className="font-medium">Warranty:</span> {product.warrantyInformation}
              </div>
              {product.weight && (
                <div>
                  <span className="font-medium">Weight:</span> {product.weight} kg
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </>
  );

  const renderAddToCartButton = () => (
    <CardFooter className="pt-3">
      <Button
        className="w-full"
        disabled={product.stock === 0}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {product.stock === 0 ? "Out of stock" : "Add to cart"}
      </Button>
    </CardFooter>
  );

  const wrapper = "group h-full overflow-hidden";

  return isDetail ? (
    <Card className={wrapper}>
      {renderContent()}
      {renderAddToCartButton()}
    </Card>
  ) : (
    <li className="list-none">
      <Card className={wrapper}>
        <Link to={Route.to} params={{ productId: String(product.id) }} className="block h-full">
          {renderContent()}
        </Link>
        {renderAddToCartButton()}
      </Card>
    </li>
  );
});
