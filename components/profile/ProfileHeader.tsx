import Icon from '@/components/common/Icon';
import ProfileOptions from "@/components/profile/ProfileOptions";
import { ProfilePicture } from "@/components/profile-picture";

import { HiLocationMarker, HiCheckCircle, HiUser, HiMail } from 'react-icons/hi';

import { getAge } from '@/lib/utils';
import { getTimeElapsed } from '@/lib/format';
import { User } from "@prisma/client"

export const ProfileHeader: React.FC<{ user: User }> = ({ user }) => {
  const userInfo = [
    { icon: HiUser, value: getAge(user.dob) },
    { icon: HiMail, value: user.email },
    { icon: HiLocationMarker, value: user.country },
  ];

  return (
    <div className="rounded-b-lg md:min-h-[30vh] relative p-6 w-full text-white bg-black bg-opacity-50 md:flex md:justify-between md:items-end gap-4">
      <div className="child absolute h-full w-full top-0 left-0 rounded-b-lg" style={{ backgroundImage: user.coverPhoto ? `url(${user.coverPhoto})` : undefined }}></div>
      <div className="md:flex gap-4">
        <div className="flex-center w-24 h-24">
          <ProfilePicture user={user}/>
        </div>  
        <div className="flex flex-col justify-end">
          <div className="flex-gap w-full">
            <h1 className="font-bold text-xl text-center md:text-start">
              {user.name}
            </h1>
            {user.isVerified && (
              <Icon icon={HiCheckCircle} color="#1174c5" size={24} />
            )}
          </div>
          {userInfo.map((info, index) => (
            <UserInfoItem key={index} icon={info.icon} value={info.value} />
          ))}
        </div>
      </div>
      <div>
        <div className="flex-gap">
          {user.lastLoggedIn && (
            <div className="mt-2 text-xs">
              Last online: {getTimeElapsed(user.lastLoggedIn)}
            </div>
          )}
          <ProfileOptions />
        </div>
      </div>
    </div>
  );
};

const UserInfoItem = ({ 
  icon: IconComponent, value 
}: {
  icon: React.ElementType;
  value: string | number;
}) => (
  <div className="flex-gap">
    {IconComponent && <IconComponent color="white" size={18} />}
    <div>{value}</div>
  </div>
);
