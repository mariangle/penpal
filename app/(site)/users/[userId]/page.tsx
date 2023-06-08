"use client"

import ProfileOverview from "@/app/components/user/ProfileOverview";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IUser } from "@/app/types/User"

const Profile = () => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { userId } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/api/users/${userId}`, {
            params: { userId: userId },
          });          
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserById();
  }, [userId]);
  
  if (!user){
    return "Loading..."
  }

  return (
    <div className="flex flex-col max-w-screen-xl mx-auto">
      <ProfileOverview user={user}/>
    </div>
  )
};

export default Profile;