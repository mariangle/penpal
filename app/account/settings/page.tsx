import SettingsForm from "../../../components/forms/SettingsForm"

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = await getSession();

  if (!session) redirect("/login")
  
  return (
    <div>
      <div className="border-b py-4">
        <h1 className="font-bold text-lg">
          Settings
        </h1>
      </div>  
      <div className="py-4">
        <SettingsForm />
      </div>    
    </div>
  )
}

export default SettingsPage