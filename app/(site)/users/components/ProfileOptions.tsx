import Button from '@/app/components/Button';
import Link from 'next/link';

import { IUser } from '@/app/types/User';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/context/UserContext';

const ProfileOverview = ({ profile }: { profile: IUser }) => {
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.email === profile.email) {
      setIsCurrentUser(true);
    }
  }, [user]);

  return (
    <div className='mt-2'>
      {!isCurrentUser && (
        <div className="flex flex-col justify-between md:flex-row md:items-center md:gap-4">
          <button className="outline_btn w-full">Send Letter</button>
        </div>
      )}
      {isCurrentUser && (
        <Link href={"/account/edit-profile"}>
          <Button fullWidth>
            Edit Profile
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProfileOverview;