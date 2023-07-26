import getCurrentUser from "@/actions/getCurrentUser";
import ProfileForm from "../../../../components/forms/ProfileForm"

import { redirect } from "next/navigation";

const EditProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login")

  return (
    <div>
      <div className="border-b py-4">
        <h1 className="font-bold text-lg">
          Edit Profile
        </h1>
      </div>
      <div className="py-4">
        <ProfileForm  user={user}/>
      </div>
    </div>
  )
}

export default EditProfilePage