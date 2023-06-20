import { IUser } from '@/app/types/User';

const ProfileInterests = ({ user }: { user: IUser }) => {
  return (
    <div className='mt-2'>
      <div className='text-sm'>
        Interests:
      </div>
      <div className='flex gap-1 flex-wrap mt-1'>
        {user.interests.map((interest, index) => (
            <div key={index} className='bg-gray-100 bg-opacity-20 px-2 py-1 rounded-md mt-1 text-xs'>
              {interest}
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInterests;