"use client"

import Button from '@/components/Button';
import Link from 'next/link';
import { BsFillEnvelopePaperFill} from "react-icons/bs"

import useUser from '@/hooks/useUser';
import useReview from '@/hooks/useReview';

import { useParams } from "next/navigation";

const ProfileOptions = () => {
  const { userId } = useParams();
  const { isCurrentUser } = useUser();
  const { canLeaveReview } = useReview();

  return (
    <div className='mt-2'>
      {isCurrentUser(userId) ? (
        <Link href={"/account/edit-profile"}>
          <Button fullWidth className='transparent_btn'>
            Edit Profile
          </Button>
        </Link>
      ) : 
      (
        <div className='flex-gap'>
          { canLeaveReview() && (
          <Link href={`/review/${userId}`}>
            <Button className='transparent_btn'>
              Review
            </Button>
          </Link>
          )}
          <Link href={"/letter/new"}>
            <Button className="white_btn">
              <BsFillEnvelopePaperFill />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileOptions;
