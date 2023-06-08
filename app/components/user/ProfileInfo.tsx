import { IUser } from '@/app/types/User'
import React from 'react'
import { useFormatDate } from '@/app/util/useFormatDate';

import Icon from '../common/Icon';
import { HiUser, HiOutlineMail } from 'react-icons/hi';

const ProfileInfo = ({ user } : {user: IUser}) => {
  return (
    <div className='border'>
        <div className='border-b-[1px] p-4 text-blue-900 font-bold'>
            Info
        </div>
        <div className='p-4'>
            <div className='flex gap-2 items-center'>
                <Icon icon={HiUser} color='gray'/>
                {user.age}
            </div>
            <div className='flex gap-2 items-center'>
                <Icon icon={HiOutlineMail} color='gray'/>
                {user.email}
            </div>
            <div>Created at {useFormatDate(user.createdAt.toString())}</div>
        </div>  
    </div>
  )
}

export default ProfileInfo