import { HiChevronDown, HiCog, HiLogout, HiUser } from "react-icons/hi";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { IconType } from "react-icons/lib";
import { IUser } from "@/common.types";

import Link from "next/link";
import ProfilePicture from "./ProfilePicture";
import Icon from "./common/Icon";
import Button from "./common/Button";
import useUser from "../hooks/useUser";

const UserNavigation = () => {
  const [showDropdown, toggleDropdown] = useState<boolean>(false);
  const { user } = useUser() as { user: IUser };

  const DropdownLink = ({ href, text, icon: IconType, onClick }: { href: string; text: string; icon: IconType; onClick?: () => void }) => (
    <Link href={href} passHref className="dropdown_link" onClick={() => toggleDropdown(false)}>
      <Icon icon={IconType} background color="black" size={12} />
      <Button onClick={onClick}>{text}</Button>
    </Link>
  );

  const dropdownLinks = [
    { href: `/${user?.id}`, text: 'Your Profile', icon: HiUser },
    { href: '/account/edit-profile', text: 'Account', icon: HiCog },
    { href: '/', text: 'Sign Out', icon: HiLogout, onClick: async () => await signOut() },
  ];

  return (
    <div className="relative">
      <div className="flex-gap cursor-pointer" onClick={() => toggleDropdown(!showDropdown)}>
        <div className="flex gap-2"> 
          <div className="w-10 h-10">
            <ProfilePicture user={user} />
          </div>
        </div>
        <div className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
          <HiChevronDown />
        </div>
      </div>
      {showDropdown && (
        <div className="dropdown gap-3 p-5">
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          {dropdownLinks.map((link, index) => (
            <DropdownLink
              key={index}
              href={link.href}
              text={link.text}
              icon={link.icon}
              onClick={link.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNavigation;