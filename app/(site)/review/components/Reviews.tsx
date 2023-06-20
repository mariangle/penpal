import Link from "next/link";
import Review from "./Review";
import Button from "@/app/components/Button";

import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IReview } from "@/app/types/Review";
import axios from "axios";

const Reviews = () => {
  const pathname = usePathname();
  const { userId } = useParams();
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data: reviews } = await axios.get("/api/reviews", {
        params: { userId: userId },
      });
      setReviews(reviews);
    };
    fetchReviews();
  }, []);

  return (
    <div className="mt-2 w-full rounded-md">
      <div className="text-sm p-4 profile_card">Reviews</div>
      <div>
        <Link href={`/review/${pathname}`}>
            <Button>
                Write Review
            </Button>
        </Link>
      </div>
      <div className="p-4 profile_card">
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
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
            <Review review={review} key={review.id}/>
        ))}
      </div>
    );
  };

export default Reviews;
