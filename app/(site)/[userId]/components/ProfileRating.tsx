import { Review } from "@prisma/client";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const ProfileRating = ({ reviews }: { reviews: Review[] }) => {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= averageRating) {
        stars.push(<BsStarFill key={i} color="gold"/>);
      } else if (i - 0.5 === averageRating) {
        stars.push(<BsStarHalf key="half" color="gold" />);
      } else {
        stars.push(<BsStar key={`empty-${i}`} color="gold"/>);
      }
    }

    return stars;
  };

  return (
        <div className='border p-4 profile_card rounded-md mt-2 md:mt-4'>
            <div className='text-sm font-semibold'>
                Reviews &#40;{reviews.length}&#41;
            </div>
            <div className="rounded-md mt-2 p-4 flex flex-col items-center">
                <div className="text-xl font-semibold">
                    {reviews.length === 0 ? "No reviews yet." : averageRating.toFixed(1)}
                </div>
                <div className="flex-gap my-2">{renderStars()}</div>
                 { reviews.length > 0 && (
                  <div>{reviews.length} rating{reviews.length > 0 ? "s" : ""}</div>
                 )}
            </div>
        </div>
  );
};

export default ProfileRating;
