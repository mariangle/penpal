import { Review as IReview } from "@prisma/client"

import Review from "./Review";

const Reviews = ({ reviews }: { reviews: IReview[] | null }) => {
  return (
    <div className="w-full rounded-md">
      <div className="p-4 profile_card">
        <h2 className="text-sm font-semibold">
          Reviews
        </h2>
      <div className="flex flex-col gap-4 mt-2">
        {reviews?.reverse().map((review) => (
          <div>
            <Review review={review}/>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};
  export default Reviews;