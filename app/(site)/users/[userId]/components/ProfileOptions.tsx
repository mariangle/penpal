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
        <div className="flex flex-col justify-between md:flex-row md:items-center md:gap-4">
          <button className="outline_btn w-full">Send Letter</button>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;
