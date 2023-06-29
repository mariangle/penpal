import ProfileForm from "../../../components/forms/ProfileForm"

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const EditProfilePage = async () => {
  const session = await getSession();

  if (!session) redirect("/login")

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

export default EditProfilePage