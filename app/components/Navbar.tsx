"use client"

import Button from "./Button"
import Link from "next/link"
import Icon from "./Icon"
import UserCard from "./UserCard"
import { HiOutlineMail, HiOutlineBell, HiOutlineMoon } from "react-icons/hi"

import { useSession } from "next-auth/react"

const Navbar = () => {
    const { status } = useSession()
    
        return (
          <>
            <div>
              <Link href="/">PenPal</Link>
            </div>
            <div className="flex gap-4 items-center">
                {/* UNAUNATHENTICATED */}
                { (status === "unauthenticated" || status === "loading") && (
                  <div className="flex gap-2 items-center">
                    <Link href={"/login"}>Sign In</Link>
                    <Link href={"/register"}><Button>Sign Up</Button></Link>
                  </div>
                )}
                {/* AUTHENTICATED */}
                { status === "authenticated" && (
                  <>
                    <Icon icon={HiOutlineMoon} size={20} color="grey"/>
                    <Icon icon={HiOutlineMail} size={20} color="grey"/>
                    <Icon icon={HiOutlineBell} size={20} color="grey"/>
                    <UserCard showMenu={true} />
                  </>
                )}
                {/* MOBILE NAV */}
            </div>
          </>
        )
    }

export default Navbar