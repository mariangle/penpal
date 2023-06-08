"use client"

import Overview from "@/app/components/user/ProfileOverview";
import Info from "@/app/components/user/ProfileInfo";
import Interests from "@/app/components/user/ProfileInterests";
import Bio from "@/app/components/user/ProfileBio";
import Comments from "@/app/components/user/ProfileComments";
import Loading from "@/app/components/common/Loading";

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
  
  if (!user) return <Loading />

  return (
    <div className="flex flex-col gap-4 max-w-screen-xl mx-auto">
      <Overview user={user}/>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 md:max-w-sm">
          <Interests user={user}/>
          <Info user={user}/>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Bio user={user}/>
          <Comments />
      </div>
      </div>
    </div>
  )
};

export default Profile;