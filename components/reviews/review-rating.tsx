import { cn } from "@/lib/utils";
import { BsStarFill } from "react-icons/bs";

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const ReviewRating: React.FC<StarRatingProps> = ({
  rating,
  interactive = false,
  onChange,
}) => {
  const handleRatingChange = (newRating: number) => {
    if (interactive && onChange) {
      onChange(newRating);
    }
  };

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <BsStarFill
        key={i}
        className={cn(  
          i <= rating ? "text-yellow-500" : "text-gray-400",
          interactive ? "cursor-pointer" : ""
          )}
        size={15}
        onClick={() => handleRatingChange(i)}
      />
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default ReviewRating;




