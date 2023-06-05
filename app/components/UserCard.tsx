import { useState } from "react";
import { HiChevronDown } from "react-icons/hi"

import { useSession, signOut } from "next-auth/react"
import axios from "axios";

interface UserCardProps {
  showMenu : boolean,
}

const UserCard: React.FC<UserCardProps> = ({
  showMenu
}) => {
  const { data: session } = useSession()
  const [showDropdown, toggleDropdown] = useState(false);

  const getUser = async () => {
    try {
      const response = await axios.get("/api/currentUser", {
        params: { email: session?.user?.email },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  

  return (
    <div className="relative">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleDropdown(!showDropdown)}>
        <img src={session?.user?.image || ""} alt="Profile" className="w-8 h-8 rounded-full" />
        <div>
          <p className="text-sm font-medium">{session?.user?.name ?? ""}</p>
          <p className="text-xs text-gray-500">{session?.user?.email || ""}</p>
        </div>
        <div className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
          <HiChevronDown />
        </div>
      </div>
      {showDropdown && showMenu && (
        <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-md w-full p-4 flex flex-col items-start text-black">
          <button>Edit Profile</button>
          <button>Settings</button>
          <button onClick={getUser}>test</button>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default UserCard;