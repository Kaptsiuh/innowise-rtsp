import type { Review } from "../../types/product";

export const ProductReviews = ({ reviews }: { reviews?: Review[] }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <>
      {reviews && reviews.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Reviews ({reviews.length})
          </h2>
          <ul className="space-y-4">
            {reviews.map((review, idx) => (
              <li key={idx} className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">
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
                    <p className="text-gray-600 mt-1">{review.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
