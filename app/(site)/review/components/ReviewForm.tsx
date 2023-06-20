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
        if (variant === "Post"){
            const updatedData = { ...formData, rating }
            await postReview(updatedData)
        } else if (variant === "Edit"){

        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4">
            <h1>{variant} Review</h1>
            <ReviewRating onChange={setRating} rating={rating} />
            <Input label="Title" id="title" type="text" register={register}/>
            <Textarea label="Content" id="content" register={register}/>
            <Button type="submit" disabled={loading || !user} fullWidth>{loading ? `${variant}ing...` : variant}</Button>
            {!user && (<span className="text-xs">To review a PenPal, please log in.</span>)}
        </form>
    )
}

export default ReviewForm;