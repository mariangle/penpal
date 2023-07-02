import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Biography } from "@/components/profile/Biography";
import { ReviewList } from "@/components/reviews/review-list";
import ProfileRating from "@/components/profile/ProfileRating";

import getUser from '@/actions/getUser';

interface IParams {
  userId: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
  const user = await getUser(params.userId);

  if (!user) return null;

  return (
    <div className="w-full">
        <ProfileHeader user={user}/>
        <div className="mt-2 md:mt-4 flex flex-col md:flex-row gap-4 md:gap-4">
          <div className="w-full md:max-w-xs">
            <Biography bio={user.about} />
            <ProfileRating reviews={user.receivedReviews}/>
          </div>
          <div className="w-full rounded-md">
            <div className="p-4 glass_card">
              <h2 className="text-sm font-semibold">
                Reviews
              </h2>
              <div className="flex flex-col gap-4 mt-2">
                <ReviewList />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
};
export default ProfilePage;