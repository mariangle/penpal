"use client"

import Input from "@/app/components/common/Input"
import { useContext } from "react"
import { UserContext } from "@/app/context/UserContext"
import { IUser } from "@/app/types/User"
import { useEffect, useState } from "react"
const ProfileForm = () => {
  const [profile, setProfile] = useState<IUser | undefined>(undefined);
  const { user } = useContext(UserContext)

  useEffect(() => {
    setProfile(user)
  }, [user])

  return (
    <div>
      <Input label="Name" id="name" type="text" value={profile?.name}/>
      <Input label="Email" id="email" type="text" value={profile?.email}/>
      <Input label="Image" id="image" type="text" value={profile?.image}/>
      <Input label="About" id="about" type="text" value={profile?.about}/>
      {/* interests */}
      <Input label="Country" id="country" type="text"value={profile?.country}/>
      <Input label="Age" id="age" type="number" value={profile?.age}/>
      {/* isVerified */}
    </div>
  )
}

export default ProfileForm