"use client"

import Button from '@/app/components/Button';
import Link from 'next/link';
import { BsFillEnvelopePaperFill} from "react-icons/bs"

import useUser from '@/app/hooks/useUser';
import { useParams } from "next/navigation";

const ProfileOptions = () => {
  const { userId } = useParams();
  const { isCurrentUser } = useUser();

  return (
    <div className='mt-2'>
      {isCurrentUser(userId) ? (
        <Link href={"/account/edit-profile"}>
          <Button fullWidth style='transparent'>
            Edit Profile
          </Button>
        </Link>
      ) : 
      (
        <div className='flex-gap'>
          <Link href={`/review/${userId}`}>
            <Button style="transparent">
              Review
            </Button>
          </Link>
          <Link href={"/letter/new"}>
            <Button style="white">
              <BsFillEnvelopePaperFill />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileOptions;
