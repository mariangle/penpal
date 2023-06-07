import { useState, useContext } from "react";
import { HiChevronDown } from "react-icons/hi";

import UserImage from "./UserImage";
import Link from "next/link";
import { UserContext } from "../../context/UserContext";
import { IUser } from "../../types/User";
import { signOut } from "next-auth/react";

interface UserCardProps {
  showMenu: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ showMenu }) => {
  const [showDropdown, toggleDropdown] = useState(false);
  const { user } = useContext(UserContext) as { user: IUser };

  const handleSignOut = async () => {
    await signOut(); 
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => toggleDropdown(!showDropdown)}
      >
        <UserImage user={user}size={40}/>
        <div> 
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <div className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
          <HiChevronDown />
        </div>
      </div>
      {showDropdown && showMenu && (
        <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-md w-full p-4 flex flex-col items-start text-black">
          <Link href="/user/profile"><button>Edit Profile</button></Link>
          <Link href="/user/settings"><button>Settings</button></Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
