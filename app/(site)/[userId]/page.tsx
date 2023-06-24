
import Loading from "@/app/components/Loading";
import ProfileHeader from "./components/ProfileHeader";
import Biography from "./components/Biography";
import Reviews from "../review/components/Reviews";
import ProfileRating from "./components/ProfileRating";

import getUser from '@/app/actions/getUser';
import getReviews from "@/app/actions/getReviews";;

interface IParams {
  userId: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
  const user = await getUser(params.userId);
  const reviews = await getReviews(params.userId);

  if (!user) return <Loading />;

  return (
    <div className="w-full">
        <ProfileHeader user={user}/>
        <div className="mt-2 md:mt-4 flex flex-col md:flex-row gap-4 md:gap-4 px-2 xl:px-0">
          <div className="w-full  md:max-w-xs">
            <Biography bio={user.about} />
            <ProfileRating reviews={user.receivedReviews}/>
          </div>
          <Reviews reviews={reviews} />
        </div>
    </div>
  )
};
export default ProfilePage;