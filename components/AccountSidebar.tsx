"use client" 

import Link from "next/link"

import { usePathname } from "next/navigation"

const Sidebar = () => {
    const pathname = usePathname();
    
  return (
    <aside className="lg:w-72">
        <ul className="flex lg:flex-col gap-4 whitespace-nowrap text-sm">
            <Link href={"/account/edit-profile"} className={pathname === "/account/edit-profile" ? "font-semibold" : ""}>
                Edit Profile
            </Link>
            <Link href={"/account/settings"} className={pathname === "/account/settings" ? "font-semibold" : ""}>
                Settings
            </Link>
        </ul>
  </aside>
  )
}

export default Sidebar