"use client"

import { useEffect, useState } from "react";
import ReviewCard from "./Review";
import axios from "axios";
import { useParams } from "next/navigation";

import ReviewForm from "@/components/forms/ReviewForm";

import { IReview } from "@/common.types";

const Reviews = () => {
  const [ reviews, setReviews ] = useState<IReview[]>([])
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

  const handleDelete = () => {

  }

  const handleAdd = () => {
    
  }

  return (
    <div className="w-full rounded-md">
      <div className="p-4 profile_card">
        <h2 className="text-sm font-semibold">
          Reviews
        </h2>
        <ReviewForm />
      <div className="flex flex-col gap-4 mt-2">
        {reviews?.reverse().map((review) => (
          <div key={review.id}>
            <ReviewCard review={review}/>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};
  export default Reviews;