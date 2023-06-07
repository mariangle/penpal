import { IUser } from '@/app/types/User'
import UserImage from './UserImage';
import { GrLocation } from "react-icons/gr"
import Link from 'next/link';

interface ProfileCardProps {
  user: IUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className='border flex items-center justify-start p-4'>
      <div className='w-16 h-16'>
        <UserImage user={user} size={60}/>
      </div>
      <div className='flex flex-col ml-4'>
        <Link href={`/users/${user.id}`}>
          <h3 className='font-bold mt-2'>{user.name}, {user.age}</h3>
        </Link>
        <div className='flex items-center gap-1'> 
          <GrLocation />
          <div>{user.country}</div>
        </div>
        <div className='flex gap-1 mt-2 flex-wrap'>
          {user.interests.map((interest, index) => (
          <div key={index} className='bg-blue-100 rounded-md py-1 px-2 text-xs'>
            {interest}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

