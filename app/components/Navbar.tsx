"use client"

import Button from "./Button"
import Link from "next/link"
import Icon from "./Icon"
import UserCard from "./UserCard"
import { HiUserCircle, HiOutlineMail, HiOutlineBell, HiOutlineMoon } from "react-icons/hi"

import { useSession } from "next-auth/react"

const Navbar = () => {
    const { status } = useSession()
    
        return (
          <div className="flex fixed w-screen top-0 justify-between px-4 py-4 items-center border-b">
            <div>
              <Link href="/">SnailMail</Link>
            </div>
            <div className="flex gap-4 items-center">
                {/* UNAUNATHENTICATED */}
                { (status === "unauthenticated" || status === "loading") && (
                  <>
                    <Link href={"/login"} className="flex gap-2 items-center">
                      <Button>Log In</Button>
                    </Link>
                  </>
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
          </div>
        )
    }

export default Navbar