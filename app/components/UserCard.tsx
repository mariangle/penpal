import { HiLocationMarker, HiCheckCircle } from "react-icons/hi"
import { getAge } from "../actions/userActions";

import ProfilePicture from './ProfilePicture';
import Icon from './Icon';
import Link from 'next/link';

import { IUser } from '@/app/types/User'

interface UserCardProps {
  user: IUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Link className='profile_card relative' href={`/users/${user.id}`}>
        {user.coverPhoto && (<div
          className="cover_image absolute w-full h-full z-[-1]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${user.coverPhoto})`,
          }}
        /> )}
        <div className='flex gap-2 p-4 pr-8'>
          <div className='w-12 h-12'>
            <ProfilePicture user={user}/>
          </div>
          <div className={`flex flex-col ${user.coverPhoto ? "text-white" : "text-black"}`}>
            <div className='flex gap-2   items-center'>
              <h3 className='font-bold'>{user.name}, {getAge(user.dob.toString())}</h3>
              <div>{user.isVerified && (<Icon icon={HiCheckCircle} color="#1174c5"/>)}</div>
            </div>
            <div className='flex items-center gap-1'> 
              <Icon icon={HiLocationMarker} color={`${user.coverPhoto ? "white" : "black"}`}/>
              <div>{user.country}</div>
            </div>
          </div>
        </div>
    </Link>
  );
}

export default UserCard;

