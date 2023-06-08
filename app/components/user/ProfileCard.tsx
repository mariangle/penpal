import { IUser } from '@/app/types/User'
import UserImage from './UserImage';
import Icon from '../common/Icon';
import { MdLocationOn } from "react-icons/md"
import Link from 'next/link';
import { TbSquareRoundedCheckFilled } from "react-icons/tb"

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
        <Link href={`/users/${user.id}`} className='flex gap-2 items-center'>
          <h3 className='font-bold'>{user.name}, {user.age}</h3>
          <div>{user.isVerified && (<Icon icon={TbSquareRoundedCheckFilled} color="#1174c5"/>)}</div>
        </Link>
        <div className='flex items-center gap-1'> 
          <Icon icon={MdLocationOn} color="#183b7c"/>
          <div>{user.country}</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

