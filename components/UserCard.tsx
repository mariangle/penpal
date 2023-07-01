import { ProfilePicture } from "@/components/ProfilePicture"
import Icon from './common/Icon';
import Link from 'next/link';

import { HiLocationMarker, HiCheckCircle } from "react-icons/hi"
import { getAge } from "@/lib/utils";
import { IUser } from "@/common.types";

export const UserCard = ({ user } : { user: IUser}) => {
  return (
    <Link className='profile_card relative' href={`/${user.id}`}>
        {user.coverPhoto && (<div
          className="cover_image absolute w-full h-full z-[-1]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${user.coverPhoto})`,
          }}
        /> )}
        <div className='flex-gap p-4 pr-8'>
          <div className="w-12 h-12">
            <ProfilePicture user={user}/>
          </div>
          <div className={`flex flex-col ${user.coverPhoto ? "text-white" : "text-black dark:text-white"}`}>
            <div className='flex-gap'>
              <h3 className='font-bold'>{user.name}, {getAge(user.dob)}</h3>
              <div>{user.isVerified && (<Icon icon={HiCheckCircle} size={15} color="#1174c5"/>)}</div>
            </div>
            <div className='flex-gap'> 
              <Icon icon={HiLocationMarker}/>
              <div>{user.country}</div>
            </div>
          </div>
        </div>
    </Link>
  );
}

