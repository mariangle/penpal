import Review from "./Review";
import ReviewForm from "./ReviewForm";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IReview } from "@/app/types/Review";
import axios from "axios";
import useReview from "@/app/hooks/useReview";

const Reviews = () => {
  const { userId } = useParams();
  const { reviews, setReviews, canLeaveReview } = useReview();

  useEffect(() => {
    const fetchReviews = async () => {
      const { data: reviews } = await axios.get("/api/reviews", {
        params: { userId: userId },
      });
      setReviews(reviews);
    };
    fetchReviews();
  }, [reviews]);

  return (
    <div className="w-full rounded-md">
      <div className="p-4 profile_card">
      <h2 className="text-sm">Reviews</h2>
        {canLeaveReview() && (<ReviewForm />)}
        <ReviewsList reviews={reviews} /> 
      </div>
    </div>
  );
};

interface ReviewsListProps {
    reviews: IReview[];
  }

const ReviewsList = ({ reviews }: ReviewsListProps) => {
    return (
      <div className="flex flex-col gap-4 mt-2">
        {reviews.reverse().map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
    );
  };

export default Reviews;
