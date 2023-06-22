"use client"


import useUser from "@/app/hooks/useUser"
import ProfileForm from "../../../components/forms/ProfileForm"

const EditProfile = () => {
  const { user } = useUser();

  if (!user) return "Loading..."

  return (
    <div>
      <div className="border-b py-4">
        <h1 className="font-bold text-lg">
          Edit Profile
        </h1>
      </div>
      <div className="py-4">
        <ProfileForm/>
      </div>
    </div>
  )
}

export default EditProfile