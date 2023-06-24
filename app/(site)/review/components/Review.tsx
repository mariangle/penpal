"use client"

import ProfilePicture from "@/app/components/ProfilePicture";
import Button from "@/app/components/Button";

import { BsStarFill, BsTrashFill } from "react-icons/bs";
import { getTimeElapsed } from "@/app/util/formatUtils";
import useReview from "@/app/hooks/useReview";
import { Review as IReview } from "@prisma/client";

const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
  
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <BsStarFill
          key={i}
          className={i <= rating ? 'text-yellow-500' : 'text-gray-400'}
          size={15}
        />
      );
    }
  
    return <div className="flex items-center gap-1">{stars}</div>;
  };

const Review = ({ review }: { review: IReview }) => {
  const { deleteReview, loading, canDeleteReview } = useReview();

  const handleDelete = async () => {
    await deleteReview(review.id)
  }

    return (
      <div className="profile_card p-4">
        <div className="flex-between flex-gap">
            <div className="w-10 h-10">
              <ProfilePicture user={review.author} />
            </div>
            <div className="w-full">
                <div className="flex-between">
                    <h3 className="font-semibold">{review.author.name}</h3>
                    <div className="flex-gap">
                      <time className="text-xs text-gray-600">{getTimeElapsed(review.createdAt)}</time>
                      {canDeleteReview(review.author.id) && (
                        <Button onClick={handleDelete} disabled={loading}>
                          <BsTrashFill color="gray"/>
                        </Button>
                      )}
                    </div>
                </div>
                <StarRating rating={review.rating} />
            </div>
        </div>
        <p className="whitespace-pre-wrap mt-2">{review.content}</p>
      </div>
    );
  };

export default Review;