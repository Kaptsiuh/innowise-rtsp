import { Route } from "@/app/routes/_authenticated/products.$productId";
import { useProduct } from "@/features/products/hooks/useProduct";
import { ProductReviews } from "@/features/products/ui/ProductReviews/ProductReviews";
import { ProductCard } from "@/shared/components";
import { Link } from "@tanstack/react-router";

export const ProductDetailPage = () => {
  const { productId } = Route.useParams();
  const { data: product, isLoading: productLoading, error: productError } = useProduct(productId);

  if (productLoading) {
    return <div className="flex h-64 items-center justify-center text-gray-500">Loading product...</div>;
  }

  if (productError || !product) {
    return <div className="flex h-64 items-center justify-center text-red-500">Error loading product</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        to="/products"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        Back to products
      </Link>
      <ProductCard product={product} variant={"detail"} />
      <ProductReviews reviews={product.reviews} />
    </div>
  );
};
