"use client"

import { BsGlobeAmericas } from "react-icons/bs"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils";

import Link from "next/link"
import UserNav from "@/components/nav/UserNav";

import useUser from "@/hooks/useUser";

const Navbar = () => {
    const { user } = useUser();

    return (
      <nav className='flex gap-2 justify-between items-center px-4 border-b w-full py-2'>
        <div className="flex gap-4">
          <Logo />
        </div>
        { user ? <UserNav user={user}/> : <LoginButton /> }
      </nav>
    )
}

const Logo = () => {
  return (
    <Link href="/" className="font-bold flex-gap text-xl">
      <BsGlobeAmericas />
      <h1 className="hidden md:block">Pen<span className="orange_gradient">Pal</span></h1>
    </Link>
  )
}

const LoginButton = () => <Link href={"/login"} className={cn(buttonVariants(), "bg-black dark:bg-white rounded-full")}>Log In</Link> 

export default Navbar