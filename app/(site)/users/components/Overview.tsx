import Icon from '@/app/components/Icon';
import UserImage from '@/app/components/ProfilePicture';
import EditPanel from './EditPanel';
import Button from '@/app/components/Button';

import { HiLocationMarker, HiCheckCircle } from 'react-icons/hi';
import { IUser } from '@/app/types/User';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/context/UserContext';

const ProfileOverview = ({ profile }: { profile: IUser }) => {
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [showEditPanel, setShowEditPanel] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.email === profile.email) {
      setIsCurrentUser(true);
    }
  }, [user]);

  const handleToggleEditPanel = () => {
    setShowEditPanel(!showEditPanel);
  };

  return (
    <div className="border p-1">
      {/* <---- HIGHER SECTION ---->*/}
      <div className="bg-blue-800 min-h-[20vh] flex items-center justify-center">
        CoverPhoto
      </div>
      {/* <---- LOWER SECTION ---->*/}
      <div className="flex items-center flex-col md:flex w-full">
        {/* PROFILE PICTURE AND ABOUT*/}
        <div className="flex flex-col items-center w-full md:flex-row">
          <div className="-translate-y-8 w-44 h-44">
            <UserImage user={profile} border />
          </div>
          <div className="md:flex justify-between items-start px-4 w-full">
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="font-bold text-xl blue_gradient">
                  {profile.name}, {profile.age}
                </h1>
                {profile.isVerified && (
                  <Icon icon={HiCheckCircle} color="#1174c5" size={24} />
                )}
              </div>
              <div className="flex gap-2 items-center bg-blue-100 text-blue-950 px-2 py-1 rounded-md mt-2">
                <Icon icon={HiLocationMarker} size={18} />
                {profile.country}
              </div>
            </div>
            {/* PROFILE DETAILS*/}
            {!isCurrentUser && (
              <div className="flex flex-col justify-between md:flex-row md:items-center md:gap-4">
                <button className="outline_btn">Send Letter</button>
              </div>
            )}
            {isCurrentUser && (
              <Button onClick={handleToggleEditPanel}>
                {showEditPanel ? 'Close Edit Panel' : 'Edit Profile'}
              </Button>
            )}
          </div>
          {showEditPanel && user && <EditPanel user={user} onClick={() => setShowEditPanel(!showEditPanel)}/>}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;