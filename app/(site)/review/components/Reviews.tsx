import Review from "./Review";
import ReviewForm from "../../../components/forms/ReviewForm";

import { IReview } from "@/app/types/Review";
import useReview from "@/app/hooks/useReview";

const Reviews = () => {
  const { reviews, canLeaveReview } = useReview();
  

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

  const ReviewsList: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {
    return (
      <div className="flex flex-col gap-4 mt-2">
        {reviews.reverse().map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
    );
  };
  
  export default Reviews;