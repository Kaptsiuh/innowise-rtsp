import { Products } from "@/features/products/ui/Products";
import { Helmet } from "react-helmet-async";

export const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Products - Innowise RTSP</title>
        <meta name="description" content="Browse our products catalog." />
        <meta property="og:title" content="Products - Innowise RTSP" />
        <meta
          property="og:description"
          content="Browse our products catalog."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">Products</h1>
        <Products />
      </div>
    </>
  );
};
