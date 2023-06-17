"use client"

import Loading from "@/app/components/Loading";
import ProfileCard from "./components/ProfileCard";
import Interests from "./components/Interests";

import { useParams } from "next/navigation";
import { getUserById } from "@/app/actions/getUserById";
import { useEffect, useState } from "react";
import { IUser } from "@/app/types/User";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserById(userId);
      setUser(fetchedUser);
    } 
    fetchUser();
  }, [user])

  if (!user) return <Loading />;

  return (
    <div className="w-full">
      <div className="md:flex gap-4">
        <div className="md:min-w-[15rem] flex-[2]">       
          <ProfileCard profile={user}/>
        </div>
        <div className="glassmorphism w-full flex-[5]">
        {user.interests.length > 0 && (
          <Interests user={user}/>   
        )}
        </div>
      </div>  
    </div>
  )
};

export default Profile;