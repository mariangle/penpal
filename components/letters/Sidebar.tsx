"use client"

import Link from "next/link"
import { FaHourglassHalf, FaInbox, FaPaperPlane } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { IconType } from "react-icons"

const sidebarLinks = [
  { to: "inbox", label: "Inbox", icon: FaInbox},
  { to: "sent", label: "Sent", icon: FaPaperPlane},
  { to: "pending", label: "Pending", icon: FaHourglassHalf}
]

const Sidebar = () => {
  return (
    <aside className="w-full lg:max-w-[200px] mb-4 md:mb-0">
      <nav>
        <h1 className="text-3xl blue_gradient font-bold">Mailbox</h1>
        <div className="h-[1px] w-full bg-gray-100 dark:bg-slate-800 my-4"/>
        <div className="flex md:flex-col gap-1">
          { sidebarLinks.map((sidebarlink) => <SidebarLink key={sidebarlink.label} to={sidebarlink.to} label={sidebarlink.label} icon={sidebarlink.icon}/> )}
        </div>
      </nav>
    </aside>
  )
}

interface SidebarLinkProps {
  label: string;
  to: string;
  icon: IconType
}

const SidebarLink = ({ label, to, icon: Icon } : SidebarLinkProps ) => {
  const pathname = usePathname();
  
  return (
        <Link href={`/letters/${to}`} className={cn(pathname.includes(to) ? "text-blue-500 dark:text-blue-500" : "dark:text-white text-gray-600", "px-2 flex-gap font-semibold")}>
            <Icon className="h-3 w-3 mr-2"/> {label}
        </Link>
  )
}

export default Sidebar