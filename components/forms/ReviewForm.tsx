"use client"

import Textarea from "@/components/common/Textarea"
import Button from "@/components/common/Button";
import ReviewRating from "../../app/review/components/ReviewRating";

import useUser from "@/hooks/useUser";
import useReview from "@/hooks/useReview";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ReviewForm = () => {
    const { user } = useUser();
    const { postReview, loading } = useReview();
    const { register, handleSubmit } = useForm<FieldValues>({})
    const [ rating, setRating ] = useState(0);
    const router = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        if (!user) return toast.error("Please log in to submit a review.");
        if (!rating || !formData.content) return toast.error("Please fill out all required fields!");
      
        const updatedData = { ...formData, rating };
        await postReview(updatedData);
      };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 w-full max-w-lg">
            <Textarea id="content" register={register} maxLength={150} placeholder="Write a review..."/>
            <ReviewRating onChange={setRating} rating={rating} />
            <div className="flex-gap mt-4">
                <Button type="button" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading} className="black_btn" fullWidth>{loading ? "Submitting..." : "Submit"}</Button>
            </div>
        </form>
    )
}

export default ReviewForm;