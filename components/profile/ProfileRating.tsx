"use client"

import { Review } from "@prisma/client";
import ReviewRating from "@/components/reviews/review-rating";

const ProfileRating = ({ reviews }: { reviews: Review[] }) => {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const roundedAverageRating = Math.ceil(averageRating);

  return (
        <div className='border p-4 glass_card rounded-md mt-2 md:mt-4'>
            <div className='text-sm font-semibold'>
                Reviews &#40;{reviews.length}&#41;
            </div>
            <div className="rounded-md mt-2 p-4 flex flex-col items-center">
                <div className="text-xl font-semibold">
                    {reviews.length === 0 ? "0" : averageRating.toFixed(1)}
                </div>
                <div className="flex-gap my-2">
                  <ReviewRating rating={roundedAverageRating}/>
                </div>
                <div>{reviews.length} rating{reviews.length === 1 ? "" : "s"}</div>
            </div>
        </div>
  );
};

export default ProfileRating;
