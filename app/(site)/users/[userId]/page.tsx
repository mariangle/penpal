"use client"

import Loading from "@/app/components/Loading";
import Overview from "../components/Overview";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IUser } from "@/app/types/User"
import { UserContext } from "@/app/context/UserContext";

const Profile = () => {
  const [profile, setProfile] = useState<IUser | undefined>(undefined);
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserById = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/api/users/${userId}`, {
            params: { userId: userId },
          });          
          if (user?.email === response.data.email){
            setProfile(user)
          } else {
            setProfile(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserById();
  }, [userId, user]);
  
  if (!profile) return <Loading />

  return (
<div className="w-full my-4">
      <div className="md:flex gap-4">
        <div className="md:min-w-[15rem] flex-[2]">       
          <Overview profile={profile}/>
        </div>
        <div className="bg-green-600 w-full flex-[5]">
          comments
        </div>
      </div>  
    </div>
  )
};

export default Profile;