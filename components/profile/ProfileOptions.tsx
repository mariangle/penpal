"use client"

import Button from '@/components/common/Button';
import Link from 'next/link';
import { BsFillEnvelopePaperFill} from "react-icons/bs"

import useUser from '@/hooks/useUser';
import useReview from '@/hooks/useReview';

import { useParams } from "next/navigation";
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const ProfileOptions = () => {
  const { userId } = useParams();
  const { isCurrentUser } = useUser();
  const { canLeaveReview } = useReview();

  return (
    <div className='mt-2'>
      {isCurrentUser(userId) ? (
        <Link href={"/account/edit-profile"} className={cn(buttonVariants({variant: "default"}), "rounded-full")}>
          Edit Profile
        </Link>
      ) : 
      (
        <div className='flex-gap'>
          { canLeaveReview() && (
          <Link href={`/${userId}/review`} className={cn(buttonVariants({variant: "secondary"}), "rounded-full")}>
            Review
          </Link>
          )}
          <Link href={`/${userId}/letter`} className={cn(buttonVariants({variant: "default"}), "rounded-full")}>
            <BsFillEnvelopePaperFill />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileOptions;
