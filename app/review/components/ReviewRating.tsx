import { BsStarFill } from 'react-icons/bs';

interface ReviewRatingProps {
  onChange: (rating: number) => void;
  rating: number;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({ onChange, rating }) => {
    const handleRatingChange = (selectedRating: number) => {
      onChange(selectedRating);
    };


  return (
    <div className='flex-gap p-2 bg-gray-100 border rounded-full'>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        selected={rating >= star}
        onClick={() => handleRatingChange(star)}
      />
    ))}
    </div>
  );
};

interface StarProps {
  selected: boolean;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ selected, onClick }) => {
    return (
      <span
        onClick={onClick}
        className={`cursor-pointer ${selected ? "text-yellow-500" : "text-gray-300"}`}
      >
        <BsStarFill size={15}/>
      </span>
    );
  };
  
export default ReviewRating;
