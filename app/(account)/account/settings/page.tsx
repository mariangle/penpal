import getCurrentUser from "@/actions/getCurrentUser";
import SettingsForm from "../../../../components/forms/SettingsForm"

import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login")
  
  return (
    <div>
      <div className="border-b py-4">
        <h1 className="font-bold text-lg">
          Settings
        </h1>
      </div>  
      <div className="py-4">
        <SettingsForm user={user} />
      </div>    
    </div>
  )
}

export default SettingsPage