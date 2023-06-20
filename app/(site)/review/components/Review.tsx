import ProfilePicture from "@/app/components/ProfilePicture";
import { BsStarFill } from "react-icons/bs";
import { formatDate } from "@/app/util/formatUtils";


import { IReview } from "@/app/types/Review";

const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
  
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <BsStarFill
          key={i}
          className={i <= rating ? 'text-yellow-500' : 'text-gray-400'}
          size={15}
        />
      );
    }
  
    return <div className="flex items-center gap-1">{stars}</div>;
  };

const Review = ({ review }: { review: IReview }) => {
  
    return (
      <div>
        <div className="flex-between flex-gap">
            <div className="w-10 h-10">
              <ProfilePicture user={review.author} />
            </div>
            <div className="w-full">
                <h3 className="font-semibold">{review.author.name}</h3>
                <div className="flex-between mb-1">
                    <StarRating rating={review.rating} />
                    <time className="text-xs text-gray-600">{formatDate(review.createdAt)}</time>
                </div>
            </div>
        </div>
        <p className="whitespace-pre-wrap">{review.content}</p>
      </div>
    );
  };

export default Review;