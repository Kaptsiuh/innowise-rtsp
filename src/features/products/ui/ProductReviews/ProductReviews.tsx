import { Card, CardHeader } from "@/shared/components";
import type { Review } from "@/shared/types/product";

export const ProductReviews = ({ reviews }: { reviews?: Review[] }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted-foreground">No reviews yet.</p>;
  }

  return (
    <>
      {reviews && reviews.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Reviews ({reviews.length})
          </h2>
          <ul className="space-y-4">
            {reviews.map((review, id) => (
              <li key={id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {review.reviewerName || "Anonymous"}
                      </span>
                      <span
                        className={
                          review.rating >= 4
                            ? "text-green-500"
                            : review.rating >= 3
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      >
                        ★
                      </span>
                      <span>{review.rating}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
