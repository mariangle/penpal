"use client"

import Loading from "@/app/components/Loading";
import ProfileCard from "./components/ProfileCard";
import Biography from "./components/Biography";
import Reviews from "../review/components/Reviews";

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
  }, [])

  if (!user) return <Loading />;

  return (
    <div className="w-full">
        <ProfileCard profile={user}/>
        <div className="mt-6 md:flex gap-6 px-2 md:px-0">
          <div className="w-full  md:max-w-xs ">
            <Biography bio={user.about} />
          </div>
          <Reviews />
        </div>
    </div>
  )
};

export default Profile;