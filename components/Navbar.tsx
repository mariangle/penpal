"use client"

import { BsFillEnvelopeFill, BsGlobeAmericas } from "react-icons/bs"
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"
import { useDarkMode } from "../hooks/useDarkmode";
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils";

import Link from "next/link"
import SearchInput from "./SearchInput"
import UserNavigation from "./UserNavigation"

import { useSession } from "next-auth/react"

const Navbar = () => {
    const { status } = useSession();
    
    return (
      <nav className='flex gap-2 justify-between items-center px-4 py-6 border-b w-full h-16'>
        <div className="flex gap-4 md">
          <Link href="/" className="font-bold flex items-center gap-1">
            <BsGlobeAmericas />
            <h1 className="hidden md:block">Pen<span className="orange_gradient">Pal</span></h1>
          </Link>
          <SearchInput />
        </div>
        <div className="flex justify-end gap-4 items-center flex-1">
            <ThemeIcon />
            { status === "authenticated" ? (
              <>
                <Link href={"/letters/inbox"}>
                  <BsFillEnvelopeFill />
                </Link>
                <UserNavigation />
              </>
            ) : (
                <Link href={"/login"} className={cn(buttonVariants(), "bg-black dark:bg-white")}>Log In</Link>
            )}
        </div>
      </nav>
    )
}

const ThemeIcon = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const handleToggleTheme = () => setTheme(colorTheme);
  return (
    <span onClick={handleToggleTheme} className="cursor-pointer">
      {colorTheme === "dark" ? (
        <HiOutlineSun size={22}/>
      ) : (
        <HiOutlineMoon size={20}/>
      )}
    </span>    
  );
};

export default Navbar