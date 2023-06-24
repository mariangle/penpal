"use client"

import { useContext, useEffect, useState } from "react"
import { useParams } from "next/navigation";

import useUser from "./useUser";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { handleError } from "../util/errorHandlers";
import { ReviewsContext } from "../context/ReviewsContext";


const useReview = () => {
    const { user } = useUser();
    const { userId } = useParams();
    const [ loading, setLoading ] = useState<boolean>(false);
    const { reviews } = useContext(ReviewsContext)

    const postReview = async (data: FieldValues) => {
      try {
        setLoading(true);
        const postData = { ...data, userId, authorId: user?.id };
        const { data: newReview } = await axios.post(`/api/reviews/`, postData);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    const deleteReview = async (reviewId: string) => {
      try {
        setLoading(true);
        await axios.delete("/api/reviews", {
          params: { reviewId: reviewId },
        });
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    const canDeleteReview = (authorId: string): boolean => {
      return user?.id === authorId || userId === user?.id;
    };

    const canLeaveReview = (): boolean => {
      const isReviewingSelf = userId === user?.id;
      const hasReviewed = reviews.some((review) => review.authorId === user?.id);
    
      return !isReviewingSelf && !hasReviewed;
    };
    
    return {
        postReview,
        deleteReview,
        reviews,
        canDeleteReview,
        canLeaveReview,
        loading,
    }
}

export default useReview;