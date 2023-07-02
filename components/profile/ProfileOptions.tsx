"use client"

import Link from 'next/link';
import { BsFillEnvelopePaperFill} from "react-icons/bs"

import useUser from '@/hooks/useUser';

import { useParams } from "next/navigation";
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const ProfileOptions = () => {
  const { userId } = useParams();
  const { isCurrentUser } = useUser();

  return (
    <div className='flex-gap mt-2 justify-end'>
      {isCurrentUser(userId) ? (
        <Link href={"/account/edit-profile"} className={cn(buttonVariants({variant: "default"}), "rounded-full")}>
          Edit Profile
        </Link>
      ) : 
      (
          <Link href={`/${userId}/review`} className={cn(buttonVariants({variant: "secondary"}), "rounded-full")}>
            Review
          </Link>
      )}
          <Link href={`/${userId}/letter`} className={cn(buttonVariants({variant: "default"}), "rounded-full")}>
            <BsFillEnvelopePaperFill />
          </Link>
    </div>
  );
};

export default ProfileOptions;
