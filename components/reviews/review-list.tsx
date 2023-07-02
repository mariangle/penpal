"use client"

import Button from "@/components/common/Button";
import Link from "next/link";
import ReviewRating from "@/components/reviews/review-rating";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useReview } from "@/hooks/useReview";
import { IReview } from "@/common.types";
import { ProfilePicture } from "@/components/ProfilePicture";
import { BsTrashFill } from "react-icons/bs";
import { getTimeElapsed } from "@/lib/format";
import axios from "axios";


export const ReviewList = () => {
  const [ reviews, setReviews ] = useState<IReview[]>([]);
  const { userId } = useParams();

  useEffect(() => {
    axios
    .get("/api/reviews", { params: { userId: userId } })
    .then(({ data }) => setReviews(data))
  }, [userId])

  return (
    <>
        {reviews && reviews.length > 0 ? (
          reviews.reverse().map((review) => <ReviewCard review={review} setReviews={setReviews} reviews={reviews} key={review.id} />)
        ) : (
          <div className="profile_card p-4">No reviews yet.</div>
        )}
    </>
  );
};

interface ReviewProps {
  review: IReview;
  reviews: IReview[];
  setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
}

const ReviewCard: React.FC<ReviewProps> = ({ review, reviews, setReviews }) => {
  const { deleteReview, canDeleteReview, loading } = useReview();

  const onDelete = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      return null;
    }
  };

    return (
      <div className="profile_card p-4">
        <div className="flex-between flex-gap">
            <Link className="h-12 w-12" href={`/${review.author.id}`}>
              <ProfilePicture user={review.author}/>              
            </Link>
            <div className="w-full">
                <div className="flex-between">
                    <h3 className="font-semibold">{review.author.name}</h3>
                    <div className="flex-gap">
                      <time className="text-xs text-gray-600">{getTimeElapsed(review.createdAt)}</time>
                      {canDeleteReview(review.author.id) && (
                        <Button onClick={async () => onDelete(review.id)} disabled={loading} variant={"link"} className="p-0">
                          <BsTrashFill color="gray"/>
                        </Button>
                      )}
                    </div>
                </div>
                <ReviewRating rating={review.rating} />
            </div>
        </div>
        <p className="whitespace-pre-wrap mt-2">{review.content}</p>
      </div>
    );
  };