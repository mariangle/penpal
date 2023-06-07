"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { IUser } from "../types/User"

const page = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users")
        setUsers(response.data)
        console.log(fetchUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div>
      Feed
      {users?.map((user, index) => (
        <div key={index}>
          {user.name}
        </div>
      ))}
    </div>
  )
}

export default page
