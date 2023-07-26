"use client"

import Button from "@/components/common/Button";
import Link from "next/link";
import ReviewRating from "@/components/reviews/review-rating";

import { useState } from "react";
import { useParams } from "next/navigation";
import useUser from "@/hooks/useUser";
import { IReview } from "@/common.types";
import { ProfilePicture } from "@/components/ProfilePicture";
import { BsTrashFill } from "react-icons/bs";
import { getTimeElapsed } from "@/lib/format";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Review, User, Reply } from "@prisma/client";

interface ReviewWithDetails extends Review {
  author: User;
  replies: Reply[];
  user: User;
}

interface ReviewListProps {
  reviews: ReviewWithDetails[]; 
}

export const ReviewList: React.FC<ReviewListProps>= ({ reviews }) => {

  return (
    <>
        {reviews.length > 0 ? (
          reviews.reverse().map((review) => <ReviewCard review={review} reviews={reviews} key={review.id} />)
        ) : (
          <div className="glass_card p-4">No reviews yet.</div>
        )}
    </>
  );
};

interface ReviewProps {
  review: ReviewWithDetails;
  reviews: ReviewWithDetails[];
}

const ReviewCard: React.FC<ReviewProps> = ({ review, reviews }) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const { user } = useUser();
  const { userId } = useParams();

  const canDeleteReview = (authorId: string): boolean => {
    return user?.id === authorId || userId === user?.id;
  };

  const onDelete = async (reviewId: string) => {
    try {
      setIsLoading(true);
      await axios.delete("/api/reviews", {
        params: { reviewId: reviewId },
      });
      toast.success("Review deleted!")
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

    return (
      <div className="glass_card p-4">
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
                        <Button onClick={async () => onDelete(review.id)} disabled={isLoading} variant={"link"} className="p-0">
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