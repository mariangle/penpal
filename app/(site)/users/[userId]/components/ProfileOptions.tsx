import Button from '@/app/components/Button';
import Link from 'next/link';

import useUser from '@/app/hooks/useUser';
import { useParams } from "next/navigation";

const ProfileOverview = () => {
  const { userId } = useParams();
  const { isCurrentUser } = useUser();

  return (
    <div className='mt-2'>
      {isCurrentUser(userId) ? (
        <Link href={"/account/edit-profile"}>
          <Button fullWidth>
            Edit Profile
          </Button>
        </Link>
      ) : 
      (
        <div className='flex gap-2'>
          <Link href={"/letter/new"}>
            <Button fullWidth style='white'>
              Message
            </Button>
          </Link>
          <Button fullWidth>
            Add Friend
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;
