"use client"

import Input from "@/app/components/Input"
import Textarea from "@/app/components/Textarea"
import Button from "@/app/components/Button";
import ReviewRating from "./ReviewRating";

import { ILetter } from "@/app/types/Letter";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import useUser from "@/app/hooks/useUser";

import useReview from "@/app/hooks/useReview";
import { toast } from "react-hot-toast";

interface ReviewFormProps {
    variant: "Post" | "Edit"
    letter?: ILetter;
}

const ReviewForm: React.FC<ReviewFormProps>= ({
    variant, letter
}) => {
    const { user } = useUser();
    const { postReview, editReview, loading } = useReview();
    const { register, handleSubmit } = useForm<FieldValues>({})
    const [ rating, setRating ] = useState(5);

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        
        if (!formData.content) {
            return toast.error("Please fill out all required fields");
        }

        const updatedData = { ...formData, rating }

        if (variant === "Post"){
            await postReview(updatedData)
        } else if (variant === "Edit"){
            await editReview(updatedData)
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4">
            <h1>{variant} Review</h1>
            <ReviewRating onChange={setRating} rating={rating} />
            <Textarea label="Content" id="content" register={register}/>
            <Button type="submit" disabled={loading || !user} fullWidth>{loading ? `${variant}ing...` : variant}</Button>
            {!user && (<span className="text-xs">To review a PenPal, please log in.</span>)}
        </form>
    )
}

export default ReviewForm;