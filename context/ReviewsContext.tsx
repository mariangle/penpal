"use client"

import { createContext, useState } from "react"
import { IReview } from "@/common.types";

interface ReviewsContextType {
    reviews: IReview[];
    setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
}

export const ReviewsContext = createContext<ReviewsContextType>({
    reviews: [],
    setReviews: () => {},
});

const ReviewsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ reviews, setReviews ] = useState<IReview[]>([]);

    return (
        <ReviewsContext.Provider value={{
            reviews,
            setReviews
            }}>
            {children}
        </ReviewsContext.Provider>
    )
}
  
export default ReviewsContextProvider