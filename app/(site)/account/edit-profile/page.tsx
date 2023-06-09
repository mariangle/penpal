"use client"


import { useContext } from "react"
import ProfileForm from "../components/ProfileForm"
import { UserContext } from "@/app/context/UserContext"

const EditProfile = () => {
  const { user } = useContext(UserContext)

  if (!user) return "Loading..."

  return (
    <div>
      <div className="border-b py-4">
        <h1 className="font-bold text-lg">
          Edit Profile
        </h1>
      </div>
      <div className="py-4">
        <ProfileForm user={user}/>
      </div>
    </div>
  )
}

export default EditProfile