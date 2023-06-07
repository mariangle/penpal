"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { IUser } from "../types/User"
import ProfileCard from "../components/user/ProfileCard"

const page = () => {
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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data?.map((user, index) => (
        <ProfileCard key={index} user={user} />
      ))}
    </div>
  )
}

export default page
