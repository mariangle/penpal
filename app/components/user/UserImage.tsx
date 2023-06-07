import { IUser } from '@/app/types/User'
import Image from 'next/image'

interface UserImageProps {
  user: IUser;
  size?: number;
}

const UserImage: React.FC<UserImageProps> = ({ user, size}) => {
  if (user?.image) {
    return <img src={user?.image} alt="" width={size} height={size} className='rounded-full'/>;
  }

  return (
    <div
      className="bg-gray-200 flex items-center justify-center rounded-full"
      style={{ width: size, height: size }}
    >
      <span>{user?.name[0]}</span>
    </div>
  );
}

export default UserImage;
