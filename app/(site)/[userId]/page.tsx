"use client"

import Loading from "@/app/components/Loading";
import ProfileOverview from "./components/ProfileOverview";
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
  }, [userId])

  if (!user) return <Loading />;

  return (
    <div className="w-full">
        <ProfileOverview profile={user}/>
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <div className="w-full  md:max-w-xs ">
            <Biography bio={user.about} />
          </div>
          <Reviews />
        </div>
    </div>
  )
};

export default Profile;