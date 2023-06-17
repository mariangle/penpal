"use client"

import ProfileCard from "../components/UserCard"
import Loading from "../components/Loading"

import { useEffect, useState } from "react"
import { IUser } from "../types/User"
import { getUsers } from "../actions/getUsers"

const Home = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);
  
  return (
    <div className="flex-center flex-col items-center w-full">
      <div className="min-h-[30vh] grid content-center my-6">
        <h1 className="head_text text-center">
          Discover <span className="orange_gradient text-center">PenPals</span>
        </h1>
        <p className="desc text-center">
        Connect with penpals worldwide and enjoy the anticipation of heartfelt messages that arrive at their own pace.</p>
      </div>
      <div className="feed">
      {users.length === 0 ? (
        <Loading />
      ) : (
        users?.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))
      )}
    </div>
    </div>
  )
}

export default Home
