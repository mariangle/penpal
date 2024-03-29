"use client"

import Link from "next/link";
import Textarea from "@/components/common/Textarea"
import Button from "@/components/common/Button";
import ReviewRating from "@/components/reviews/review-rating";

import * as z from "zod"
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod"
import { buttonVariants } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";
import { handleError } from "@/lib/error";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
    content: z.string().min(1),
});

type ReviewFormValues = z.infer<typeof formSchema>

interface ReviewFormProps {
    user: User;
    currentUser: User | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ user, currentUser }) => {
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(formSchema),
      });

    const [ rating, setRating ] = useState(0);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { userId } = useParams();
    const router = useRouter();

    const onSubmit: SubmitHandler<ReviewFormValues> = async (reviewData) => {
        if (!currentUser) return toast.error("Please log in to submit a review.");
        if (!reviewData.content) return toast.error("Please fill out all required fields!");

        setIsLoading(true);
        try {
          await axios.post(`/api/reviews/`, { ...reviewData, rating, userId });
          router.push(`/${userId}`)
        } catch (error) {
          handleError(error);
        } finally {
        setIsLoading(false);
        }
      };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Textarea id="content" register={form.register} maxLength={150} placeholder="Write a review..." validation={form.formState.errors.content}/>
            <div className="mt-2 space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                    <ReviewRating onChange={setRating} rating={rating} interactive={true} />
                </div>
            </div>
            <div className="flex-gap mt-4">
                <Link href={`/${user.id}`} className={buttonVariants({ variant: "secondary" })}>Cancel</Link>
                <Button type="submit" disabled={isLoading} className="w-full">{isLoading ? "Submitting..." : "Submit"}</Button>
            </div>
        </form>
    )
}

export default ReviewForm;