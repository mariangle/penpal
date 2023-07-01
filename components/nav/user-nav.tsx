"use client"

import {
  LogOut,
  Mail,
  Settings,
  User,
} from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeOptions } from "@/components/theme-options"

import { IUser } from "@/common.types"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { ProfilePicture } from "@/components/ProfilePicture"

const UserNav = ({ user } : { user: IUser}) => {
  
    const DROPDOWN_LINKS = [
      { to: `/${user?.id}`, label: 'Your Profile', icon: User },
      { to: `/letters/inbox`, label: 'Inbox', icon: Mail },
      { to: '/account/edit-profile', label: 'Account', icon: Settings },
      { to: '/', label: 'Sign Out', icon: LogOut, onClick: signOut },
    ];
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-12 h-12">
            <ProfilePicture user={user} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownLink link={DROPDOWN_LINKS[0]} />
            <DropdownLink link={DROPDOWN_LINKS[1]} />
            <DropdownLink link={DROPDOWN_LINKS[2]} />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <ThemeOptions />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownLink link={DROPDOWN_LINKS[3]} />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  interface DropdownLinkProps {
    link: {
      to: string;
      label: string;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      onClick?: () => Promise<void>;
    };
  }
  
  const DropdownLink = ({ link }: DropdownLinkProps) => {
    const { to, label, icon: Icon, onClick } = link;
  
    return (
      <Link href={to} onClick={onClick}>
        <DropdownMenuItem>
          <Icon className="mr-2 h-4 w-4" />
          <span>{label}</span>
        </DropdownMenuItem>
      </Link>
    );
  };
  
export default UserNav;