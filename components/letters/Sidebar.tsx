"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { IconType } from "react-icons"
import { SIDEBAR_LINKS } from "@/lib/constants"

const Sidebar = () => {
  return (
    <aside className="w-full lg:max-w-[200px] mb-4 md:mb-0">
      <nav>
        <h1 className="text-3xl blue_gradient dark:purple_gradient font-bold">Mailbox</h1>
        <div className="h-[1px] w-full bg-gray-100 dark:bg-slate-800 my-4"/>
        <div className="flex md:flex-col gap-1">
          { SIDEBAR_LINKS.map((sidebarLink) => <SidebarLink key={sidebarLink.label} to={sidebarLink.to} label={sidebarLink.label} icon={sidebarLink.icon}/> )}
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
        <Link href={`/letters/${to}`} className={cn(pathname.includes(to) ? "text-blue-500 dark:text-green-500" : "dark:text-white text-gray-600", "px-2 flex-gap font-semibold")}>
            <Icon className="h-3 w-3 mr-2"/> {label}
        </Link>
  )
}

export default Sidebar