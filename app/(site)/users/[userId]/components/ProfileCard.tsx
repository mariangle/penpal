import Icon from '@/app/components/Icon';
import ProfileOptions from "@/app/(site)/users/[userId]/components/ProfileOptions";
import ProfilePicture from "@/app/components/ProfilePicture";

import { HiLocationMarker, HiCheckCircle, HiUser, HiMail } from 'react-icons/hi';

import { getAge } from '@/app/actions/userActions';
import { getLastOnline } from '@/app/actions/getLastOnline';
import { IUser } from '@/app/types/User';

const Overview = ({ profile } : { profile: IUser }) => {
  return (
    <div className='rounded-md border'>
          <div
          className="cover_image"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${profile.coverPhoto})`
          }}
        >       
          <div className='p-4 text-white'>
              <div className='flex-center'>
                <div className='w-44 h-44 md:w-32 md:h-32 text-black'>
                  <ProfilePicture user={profile}/>
                </div>
              </div>
              <div className="flex-center mt-2 gap-2">
                <h1 className="font-bold text-xl text-center">
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
                    Bio:
                  </div>
                  <div className="bg-black bg-opacity-20 px-2 py-1 rounded-md mt-1">
                    {profile.about}
                  </div>
                </div>
              )}
              <ProfileOptions />
              {profile.lastLoggedIn && (
                <div className='mt-2 text-xs'>
                  Last online: {getLastOnline(profile.lastLoggedIn.toString())}
                </div>
            )}
          </div>     
        </div>
    </div>
  )
}

export default Overview