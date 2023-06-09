import { useState, useContext } from "react";
import { HiChevronDown } from "react-icons/hi";

import UserImage from "./ProfilePicture";
import Link from "next/link";
import { UserContext } from "../context/UserContext";
import { IUser } from "../types/User";
import { signOut } from "next-auth/react";

interface AccountCardProps {
  showMenu: boolean;
}

const AccountCard: React.FC<AccountCardProps> = ({ showMenu }) => {
  const [showDropdown, toggleDropdown] = useState(false);
  const { user } = useContext(UserContext) as { user: IUser };

  const handleSignOut = async () => {
    await signOut(); 
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="flex gap-2"> 
          <Link href={`/users/${user?.id}`}>
            <UserImage user={user}size={40}/>
          </Link>
          <div onClick={() => toggleDropdown(!showDropdown)}>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div onClick={() => toggleDropdown(!showDropdown)} className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
          <HiChevronDown />
        </div>
      </div>
      {showDropdown && showMenu && (
        <div className="dropdown z-10">
          <Link onClick={() => toggleDropdown(!showDropdown)} href={`/account/edit-profile`} className="dropdown_link"><button>Edit Profile</button></Link>
          <button onClick={handleSignOut} className="dropdown_link">Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default AccountCard;
