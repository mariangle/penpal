import { useEffect, useState } from "react"
import { useParams } from "next/navigation";

import useUser from "./useUser";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { handleError } from "../util/errorHandlers";
import { IReview } from "../types/Review";


const useReview = () => {
    const { user } = useUser();
    const { userId } = useParams();
    const [ reviews, setReviews ] = useState<IReview[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);

    const postReview = async (data: FieldValues) => {
      try {
        setLoading(true);
        const postData = { ...data, userId, authorId: user?.id };
        const { data: newReview } = await axios.post(`/api/reviews/`, postData);
        setReviews([...reviews, newReview]);
        fetchReviews(); 
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
    
        setReviews(reviews.filter(review => review.id !== reviewId));
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

    const fetchReviews = async () => {
      try {
        const { data: reviews } = await axios.get("/api/reviews", {
          params: { userId: userId },
        });
        return reviews;
      } catch (error) {
        handleError(error);
      }
    };
  
    useEffect(() => {
      const getReviews = async () => {
        const reviews = await fetchReviews();
        setReviews(reviews);
      }
      getReviews();
    }, [reviews.length]);
    
    return {
        postReview,
        deleteReview,
        reviews,
        setReviews,
        canDeleteReview,
        canLeaveReview,
        loading,
    }
}

export default useReview;