"use client"

import Button from "@/components/common/Button";
import Link from "next/link";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useReview } from "@/hooks/useReview";
import { IReview } from "@/common.types";
import { ProfilePicture } from "@/components/profile-picture";

import { BsTrashFill } from "react-icons/bs";
import { getTimeElapsed } from "@/lib/format";
import { ReviewRating } from "@/components/reviews/review-rating";

export const ReviewList = () => {
  const [ reviews, setReviews ] = useState<IReview[]>([]);
  const { userId } = useParams();

  useEffect(() => {
    axios
    .get("/api/reviews", { params: { userId: userId } })
    .then(({ data }) => setReviews(data))
  }, [])

  return (
    <>
        {reviews && reviews.length > 0 ? (
          reviews.reverse().map((review) => <ReviewCard review={review} key={review.id} />)
        ) : (
          <div className="profile_card p-4">No reviews yet.</div>
        )}
    </>
  );
};

const ReviewCard = ({ review }: { review: IReview }) => {
  const { deleteReview, loading, canDeleteReview } = useReview();

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
                        <Button onClick={() => deleteReview(review.id)} disabled={loading} variant={"link"} className="p-0">
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