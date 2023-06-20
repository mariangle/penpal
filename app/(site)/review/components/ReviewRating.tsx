import { BsStarFill, BsStar } from 'react-icons/bs';

interface ReviewRatingProps {
  onChange: (rating: number) => void;
  rating: number;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({ onChange, rating }) => {
    const handleRatingChange = (selectedRating: number) => {
      onChange(selectedRating);
    };


  return (
    <div className='mb-4'>
      <p className='block text-sm font-medium text-gray-900 mb-1'>Rate PenPal</p>
      <div className='flex-gap p-2 bg-gray-100 rounded-full'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            selected={rating >= star}
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>
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
        className={`cursor-pointer ${selected ? "text-yellow-500" : "text-gray-400"}`}
      >
        <BsStarFill />
      </span>
    );
  };
  
export default ReviewRating;
