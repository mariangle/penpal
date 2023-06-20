import { useState } from "react"
import { useParams } from "next/navigation";

import useUser from "./useUser";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { handleError } from "../util/errorHandlers";
import { IReview } from "../types/Review";


const useReview = () => {
    const { user } = useUser();
    const [ reviews, setReviews ] = useState<IReview[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const { userId } = useParams();

    const postReview = async (data: FieldValues) => {
        try {
          setLoading(true);
          const postData = { ...data, userId, authorId: user?.id };
          await axios.post(`/api/reviews/`, postData);
        } catch (error) {
          handleError(error);
        } finally {
          setLoading(false);
        }
      };

    const deleteReview = async (reviewId: string) => {
      try {
        setLoading(true);
        const { data: updatedReviews } = await axios.delete("/api/reviews", {
          params: { reviewId: reviewId },
        });
        setReviews(updatedReviews);
      } catch (error){
        handleError(error);
      } finally {
        setLoading(false);   
      }
    }

    const isReviewAuthor = (authorId: string): boolean => {
      return user?.id === authorId;
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
        setReviews,
        isReviewAuthor,
        canLeaveReview,
        loading,
    }
}

export default useReview;