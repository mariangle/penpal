"use client"

import ProfileCard from "../components/user/ProfileCard"
import Loading from "../components/common/Loading"

import axios from "axios"
import { useEffect, useState } from "react"
import { IUser } from "../types/User"

const Home = () => {
  const [data, setData] = useState<IUser[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data} = await axios.get("/api/users")
        setData(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [])

  if (data.length === 0) return <Loading />;
  
  return (
    <div className="flex-center flex-col w-full">
      <div className="min-h-[30vh] grid content-center">
        <h1 className="head_text text-center">
          Discover <span className="orange_gradient text-center">PenPals</span>
        </h1>
        <p className="desc text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, voluptate veritatis reiciendis fugiat iure nesciunt accusamus. Aliquid magnam praesentium consequatur.
        </p>
      </div>
      <div className="feed">
      {data?.map((user) => (
        <ProfileCard key={user.id} user={user} />
      ))}
    </div>
    </div>
  )
}

export default Home
