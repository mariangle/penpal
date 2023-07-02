import getCurrentUser from "@/actions/getCurrentUser"
import Sidebar from "@/components/letters/Sidebar";

import { redirect } from "next/navigation";


const LettersLayout = async ({children} : {children : React.ReactNode} ) => {
  const user = await getCurrentUser();

  if (!user) redirect("/login")

  return (
    <div className="layout">
        <div className="lg:flex gap-4 min-h-[85vh] glassmorphism mt-6">
          <Sidebar />
          {children}
        </div>
    </div>
  )
}

export default LettersLayout