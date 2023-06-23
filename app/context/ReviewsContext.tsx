"use client"

import { createContext, useState, useEffect } from "react"
import { IReview } from "../types/Review";
import { useParams } from "next/navigation";
import axios from "axios";

interface ReviewsContextType {
    reviews: IReview[];
}

export const ReviewsContext = createContext<ReviewsContextType>({
    reviews: [],
});

const ReviewsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ reviews, setReviews ] = useState([]);
    const { userId } = useParams(); 

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data: reviews } = await axios.get("/api/reviews", {
                    params: { userId: userId },
                  });
                  console.log("userId,", userId)

                setReviews(reviews);
                } catch (err) {
                console.log("Error fetching reviews:", err)
            }
        }
        fetchReviews();
    }, [])

    return (
        <ReviewsContext.Provider value={{reviews}}>
            {children}
        </ReviewsContext.Provider>
    )
}
  
export default ReviewsContextProvider