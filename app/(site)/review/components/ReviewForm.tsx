"use client"

import Textarea from "@/app/components/Textarea"
import Button from "@/app/components/Button";
import ReviewRating from "./ReviewRating";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import useUser from "@/app/hooks/useUser";

import useReview from "@/app/hooks/useReview";
import { toast } from "react-hot-toast";

const ReviewForm = () => {
    const { user } = useUser();
    const { postReview, loading } = useReview();
    const { register, handleSubmit } = useForm<FieldValues>({})
    const [ rating, setRating ] = useState(0);

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        
        if (!formData.content) {
            return toast.error("Review cannot be empty!");
        }

        if (!rating) {
            return toast.error("Please rate the PenPal");
        }

        const updatedData = { ...formData, rating }
        await postReview(updatedData)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <Textarea id="content" register={register} maxLength={150} placeholder="Write a review..."/>
            <div className="flex-gap">
                <Button type="submit" disabled={loading || !user} style="black">{loading ? "Submitting..." : "Submit"}</Button>
                <ReviewRating onChange={setRating} rating={rating} />
            </div>
        </form>
    )
}

export default ReviewForm;