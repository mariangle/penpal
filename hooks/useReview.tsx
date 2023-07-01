"use client"

import { useContext, useState } from "react"
import { useParams, useRouter } from "next/navigation";

import useUser from "./useUser";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { handleError } from "../lib/error";
import { ReviewsContext } from "../context/ReviewsContext";
import { toast } from "react-hot-toast";

export const useReview = () => {
  const router = useRouter();
  const { user } = useUser();
  const { userId } = useParams();
  const [ loading, setLoading ] = useState<boolean>(false);

  const postReview = async (data: FieldValues) => {
    if (!data.rating || !data.content) return toast.error("Please fill out all required fields!");

    setLoading(true);
    try {
      await axios.post(`/api/reviews/`, { ...data, userId });
      router.push(`/${userId}`)
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
      toast.success("Review deleted!")
      window.location.assign(`/${userId}`);
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
  
    return !isReviewingSelf;
  };
  
  return {
      postReview,
      deleteReview,
      canDeleteReview,
      canLeaveReview,
      loading,
  }
}

export default useReview;