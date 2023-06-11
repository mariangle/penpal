"use client"

import ProfileCard from "./users/components/ProfileCard"
import Loading from "../components/Loading"

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
  
  return (
    <div className="flex-center flex-col items-center w-full">
      <div className="min-h-[30vh] grid content-center">
        <h1 className="head_text text-center">
          Discover <span className="orange_gradient text-center">PenPals</span>
        </h1>
        <p className="desc text-center">
        Embrace the nostalgia of traditional letter writing in a digital world. Connect with penpals worldwide and enjoy the anticipation of heartfelt messages that arrive at their own pace.</p>
      </div>
      <div className="feed">
      {data.length === 0 ? (
        <Loading />
      ) : (
        data?.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))
      )}
    </div>
    </div>
  )
}

export default Home
