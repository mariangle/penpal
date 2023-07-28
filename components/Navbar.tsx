"use client"

import { BsGlobeAmericas } from "react-icons/bs"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils";

import Link from "next/link"
import UserNav from "@/components/UserNav";

import useUser from "@/hooks/useUser";

const Navbar = () => {
    const { user } = useUser();

    return (
      <nav className='sticky top-0 px-4 border-b w-full'>
        <div className='max-w-screen-xl mx-auto flex-gap justify-between py-2 px-2'>
          <div className='flex gap-4'>
            <Logo />
          </div>
          { user ? 
            <UserNav user={user}/> 
            : 
            ( 
              <div className="flex-gap">
                <LoginButton /> 
                <RegisterButton />
              </div>
            )
          }
        </div>
      </nav>
    )
}

const Logo = () => {
  return (
    <Link href="/" className="font-bold flex-gap text-xl">
      <BsGlobeAmericas />
      <h1 className="hidden md:block">PenPal</h1>
    </Link>
  )
}
const LoginButton = () => <Link href={"/login"} className={cn(buttonVariants({variant: "ghost"}))}>Log In</Link> 
const RegisterButton = () => <Link href={"/register"} className={cn(buttonVariants(), "bg-black dark:bg-white rounded-full")}>Sign Up</Link> 

export default Navbar