import Icon from '@/app/components/Icon';
import ProfileOptions from "@/app/(site)/[userId]/components/ProfileOptions";
import ProfilePicture from "@/app/components/ProfilePicture";

import { HiLocationMarker, HiCheckCircle, HiUser, HiMail } from 'react-icons/hi';

import { getAge } from '@/app/actions/userActions';
import { getTimeElapsed } from '@/app/actions/getTimeElapsed';
import { IUser } from '@/app/types/User';

const Overview = ({ profile } : { profile: IUser }) => {
  return (
      <div className={`rounded-b-lg md:min-h-[30vh] relative p-6 w-full text-white bg-black bg-opacity-50 md:flex md:justify-between md:items-end gap-4`}>
          {/* <---  COVER PHOTO ---> */}
          <div
              className="child absolute h-full w-full top-0 left-0"
              style={{
                backgroundImage: profile.coverPhoto
                  ? `url(${profile.coverPhoto})`
                  : undefined
              }}
            >
          </div> 
          {/* <---  BASIC USER INFO ---> */}
          <div className='md:flex gap-4'>
            {/* <--- PROFILE IMAGE ---> */}
            <div className='flex-center'>
              <div className='w-36 h-36 md:h-32 md:w-32 text-black'>
                <ProfilePicture user={profile}/>
              </div>
            </div>
            <div className='flex flex-col justify-end'>
              {/* <---  NAME AND BADGE ---> */}
              <div className="flex-gap w-full">
                <h1 className="font-bold text-xl text-center md:text-start">
                  {profile.name}
                </h1>
                {profile.isVerified && (
                  <Icon icon={HiCheckCircle} color="#1174c5" size={24} />
                )}
              </div>
              {/* <---  AGE ---> */}
              <div className='flex-gap'>
                <HiUser />
                <div>
                  {getAge(profile.dob.toString())}
                </div>
              </div>
              {/* <--- EMAIL --> */}
              <div className='flex-gap'>
                <HiMail />
                <div>
                  {profile.email}
                </div>
              </div>
              {/* <---  COUNTRY ---> */}
              <div className='flex-gap'>
                <HiLocationMarker />
                <div>
                  {profile.country}
                </div>
              </div>
            </div>
          </div>
          <div className='flex-gap'>
            {profile.lastLoggedIn && (
            <div className='mt-2 text-xs'>
                  Last online: {getTimeElapsed(profile.lastLoggedIn)}
            </div>
            )}
            <ProfileOptions />
          </div>
      </div>
  )
}

export default Overview