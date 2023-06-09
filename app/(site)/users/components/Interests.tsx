import { IUser } from '@/app/types/User';

const ProfileInterests = ({ user }: { user: IUser }) => {
  return (
    <div className="border">
      <div className="border-b-[1px] p-4 text-blue-900 font-bold">
        Interests
      </div>
      <div className="p-4 flex gap-2 flex-wrap">
        {user.interests && user.interests.length > 0 ? (
          user.interests.map((interest, index) => (
            <div key={index} className='bg-blue-100 border-blue-200 border-[1px] px-2 py-1 rounded-md text-blue-900'>
              {interest}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-base">
            User has not added any interest yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInterests;
