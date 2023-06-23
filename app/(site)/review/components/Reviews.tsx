import Review from "./Review";
import ReviewForm from "../../../components/forms/ReviewForm";

import { IReview } from "@/app/types/Review";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";


const Reviews = () => {
  const [ reviews, setReviews ] = useState<IReview[]>([]);
  const { userId } = useParams(); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
          const { data: reviews } = await axios.get("/api/reviews", {
              params: { userId: userId },
            });
          setReviews(reviews);
          } catch (err) {
          console.log("Error fetching reviews:", err)
      }
  }
  fetchReviews();
  }, [])

  return (
    <div className="w-full rounded-md">
      <div className="p-4 profile_card">
      <h2 className="text-sm">Reviews</h2>
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