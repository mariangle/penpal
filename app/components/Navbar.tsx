"use client"

import { HiMail, HiGlobe } from "react-icons/hi"

import Button from "./Button"
import Link from "next/link"
import Icon from "./Icon"
import UserCard from "./AccountCard"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"


const Navbar = () => {
    const { status } = useSession()
      const pathname = usePathname();
    
    return (
      <>
        <div>
          <Link href="/" className="font-bold flex items-center gap-1">
            <HiGlobe />
            <h1>PenPal</h1>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
            {/* UNAUNATHENTICATED */}
            { (status === "unauthenticated" || status === "loading") && (
              <div className="flex gap-2 items-center">
                <Link href={"/login"}>Sign In</Link>
                <Link href={"/register"}><button className="outline_btn">Join</button></Link>
              </div>
            )}
            {/* AUTHENTICATED */}
            { status === "authenticated" && (
              <>
                { pathname.includes("inbox") && (
                  <Button><Link href={"/letter/new"}>Compose</Link></Button>
                )}
                <Link href={"/inbox"}>
                  <Icon icon={HiMail} size={25} color="lightgrey"/>
                </Link>
                <UserCard showMenu={true} />
              </>
            )}
            {/* MOBILE NAV */}
        </div>
      </>
    )
    }

export default Navbar