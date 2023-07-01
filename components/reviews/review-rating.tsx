import { BsStarFill } from "react-icons/bs";

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const ReviewRating: React.FC<StarRatingProps> = ({
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
        className={i <= rating ? "text-yellow-500" : "text-gray-400"}
        size={15}
        onClick={() => handleRatingChange(i)}
      />
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};





