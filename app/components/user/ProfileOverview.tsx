import Icon from '@/app/components/common/Icon';
import UserImage from '@/app/components/user/UserImage';

import { TbSquareRoundedCheckFilled } from 'react-icons/tb';
import { MdLocationOn } from 'react-icons/md';
import { IUser } from '@/app/types/User';

const ProfileOverview = ({ user }: { user: IUser }) => {

  return (
    <div className="border p-1">
      {/* <---- HIGHER SECTION ---->*/}
      <div className="bg-blue-800 min-h-[20vh] flex items-center justify-center">
        CoverPhoto
      </div>
      {/* <---- LOWER SECTION ---->*/}
      <div className='flex items-center flex-col md:flex w-full'>
        {/* PROFILE PICTURE AND ABOUT*/}
        <div className='flex flex-col items-center w-full md:flex-row'>
          <div className='-translate-y-8 px-4'>
            <UserImage user={user} size={150} border />
          </div>
          <div className="md:flex justify-between items-start px-4 w-full">
            <div>
              <div className='flex gap-2 items-center'>
                <h1 className="font-bold text-xl">
                  {user.name}, {user.age}
                </h1>
                {user.isVerified && (
                  <Icon icon={TbSquareRoundedCheckFilled} color="#1174c5" size={24} />
                )}
              </div>
              <div className="flex gap-2 items-center bg-blue-100 text-blue-950 px-2 py-1 rounded-md mt-2">
                <Icon icon={MdLocationOn} size={18} />
                {user.country}
              </div>
            </div>
            {/* PROFILE DETAILS*/}
            <div className="flex flex-col justify-between md:flex-row md:items-center md:gap-4">
              <button className="bg-black text-white p-2 rounded-md">Send Letter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
