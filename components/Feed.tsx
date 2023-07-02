import { ProfilePicture } from "@/components/ProfilePicture"
import Icon from './common/Icon';
import Link from 'next/link';

import { HiLocationMarker, HiCheckCircle } from "react-icons/hi"
import { getAge } from "@/lib/utils";
import { IUser } from "@/common.types";

import prisma from "@/lib/prismadb"

const Feed = async () => {
  const users = await prisma.user.findMany()

  return (
    <div className="flex flex-wrap gap-2 max-w-screen-lg justify-center px-2">
      {users?.map((user: IUser) => <UserCard key={user.id} user={user} />)}
    </div>
  )
}

const UserCard = ({ user } : { user: IUser}) => {
  return (
    <Link className='glass_card relative card-w' href={`/${user.id}`}>
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
              <div>{user.isVerified && (<Icon icon={HiCheckCircle} size={15} color="#3590db"/>)}</div>
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

export default Feed;
