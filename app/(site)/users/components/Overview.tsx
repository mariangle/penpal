import Icon from '@/app/components/Icon';
import ProfileOptions from "@/app/(site)/users/components/ProfileOptions";
import Interests from "@/app/(site)/users/components/Interests";
import ProfilePicture from "@/app/components/ProfilePicture";

import { HiLocationMarker, HiCheckCircle, HiUser, HiMail } from 'react-icons/hi';

import { getAge } from '@/app/hooks/useUtil';
import { IUser } from '@/app/types/User';

const Overview = ({ profile } : { profile: IUser }) => {
  return (
    <div className='rounded-md border p-2'>
          <div
          className="cover_image"
          style={{
            backgroundImage: `linear-gradient(rgba(41, 86, 182, 0.4), rgba(0, 0, 0, 0.8)), url(${profile.image})`,
            backdropFilter: "blur(20px)",
          }}
        >       
          <div className='p-4 text-white'>
              <div className='flex-center'>
                <div className='w-44 h-44 md:w-32 md:h-32 text-black'>
                  <ProfilePicture user={profile}/>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <h1 className="font-bold text-xl blue_gradient">
                  {profile.name}
                </h1>
                {profile.isVerified && (
                  <Icon icon={HiCheckCircle} color="#1174c5" size={24} />
                )}
              </div>
              <div className='flex items-center gap-2'>
                <HiUser />
                <div>
                  {getAge(profile.dob.toString())}
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <HiMail />
                <div>
                  {profile.email}
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <HiLocationMarker />
                <div>
                  {profile.country}
                </div>
              </div>
              {profile.about && (
                <div className='mt-2'>
                  <div className='text-sm'>
                    About:
                  </div>
                  <div className="bg-black bg-opacity-20 px-2 py-1 rounded-md mt-1">
                    {profile.about}
                  </div>
                </div>
              )}
              {profile.interests.length > 0 && (
                <Interests user={profile}/>   
              )}
              <ProfileOptions profile={profile}/>
          </div>     
        </div>
    </div>
  )
}

export default Overview