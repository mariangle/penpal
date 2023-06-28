"use client"

import Textarea from "@/components/Textarea"
import Button from "@/components/Button";
import ReviewRating from "../../review/components/ReviewRating";

import useUser from "@/hooks/useUser";
import useReview from "@/hooks/useReview";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ReviewForm = () => {
    const { user } = useUser();
    const { postReview, loading } = useReview();
    const { register, handleSubmit } = useForm<FieldValues>({})
    const [ rating, setRating ] = useState(0);

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        if (!user) return toast.error("Please log in to submit a review.");
        if (!rating || !formData) return toast.error("Please fill out all required fields!");
      
        const updatedData = { ...formData, rating };
        await postReview(updatedData);
      };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <Textarea id="content" register={register} maxLength={150} placeholder="Write a review..."/>
            <ReviewRating onChange={setRating} rating={rating} />
            <Button type="submit" disabled={loading} className="black_btn">{loading ? "Submitting..." : "Submit"}</Button>
        </form>
    )
}

export default ReviewForm;