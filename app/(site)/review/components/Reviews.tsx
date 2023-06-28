"use client"

import { useEffect } from "react";
import ReviewCard from "./Review";
import axios from "axios";
import { useParams } from "next/navigation";
import useReview from "@/hooks/useReview";

const Reviews = () => {
  const { reviews, setReviews } = useReview();
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
        <h2 className="text-sm font-semibold">
          Reviews
        </h2>
      <div className="flex flex-col gap-4 mt-2">
        {reviews?.reverse().map((review) => (
          <div>
            <ReviewCard review={review}/>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};
  export default Reviews;