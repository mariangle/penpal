"use client"

import Textarea from "@/components/common/Textarea"
import Button from "@/components/common/Button";
import { ReviewRating } from "@/components/reviews/review-rating";

import useUser from "@/hooks/useUser";
import { useReview } from "@/hooks/useReview";
import { buttonVariants } from "../ui/button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import Link from "next/link";

export const ReviewForm = () => {
    const { user } = useUser();
    const { userId } = useParams();
    const { postReview, loading } = useReview();
    const { register, handleSubmit } = useForm<FieldValues>({})
    const [ rating, setRating ] = useState(0);

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        if (!user) return toast.error("Please log in to submit a review.");

        await postReview({ ...formData, rating });
      };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea id="content" register={register} maxLength={150} placeholder="Write a review..."/>
            <div className="mt-2 space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                    <ReviewRating onChange={setRating} rating={rating} interactive={true} />
                </div>
            </div>
            <div className="flex-gap mt-4">
                <Link href={`/${userId}`} className={buttonVariants({ variant: "secondary" })}>Cancel</Link>
                <Button type="submit" disabled={loading} className="w-full">{loading ? "Submitting..." : "Submit"}</Button>
            </div>
        </form>
    )
}

export default ReviewForm;