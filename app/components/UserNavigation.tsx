import { useState, useContext } from "react";
import { HiChevronDown, HiCog, HiOutlineLogout, HiUser } from "react-icons/hi";

import ProfilePicture from "./ProfilePicture";
import Link from "next/link";
import Icon from "./Icon";

import { UserContext } from "../context/UserContext";
import { IUser } from "../types/User";
import { signOut } from "next-auth/react";

interface UserNavigationProps {
  showMenu: boolean;
}

const UserNavigation: React.FC<UserNavigationProps> = ({ showMenu }) => {
  const [showDropdown, toggleDropdown] = useState<boolean>(false);
  const { user } = useContext(UserContext) as { user: IUser };

  const handleSignOut = async () => {
    await signOut(); 
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleDropdown(!showDropdown)}>
        <div className="flex gap-2"> 
          <div className="w-10 h-10">
              <ProfilePicture user={user} />
          </div>
        </div>
        <div className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
          <HiChevronDown />
        </div>
      </div>
      {/* DROPDOWN */}
      {showDropdown && showMenu && (
        <div className="dropdown">
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <Link onClick={() => toggleDropdown(!showDropdown)} href={`/users/${user?.id}`} className="dropdown_link">
            <Icon icon={HiUser} background color="black" size={12}/>
            <button>
              Your Profile
            </button>
          </Link>
          <Link onClick={() => toggleDropdown(!showDropdown)} href={`/account/settings`} className="dropdown_link">
            <Icon icon={HiCog} background color="black"size={12}/>
            <button>Settings</button>
          </Link>
          <button onClick={handleSignOut} className="dropdown_link">
            <Icon icon={HiOutlineLogout} background color="black" size={12}/>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNavigation;
