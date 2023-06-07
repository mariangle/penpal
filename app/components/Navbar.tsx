"use client"

import Button from "./common/Button"
import Link from "next/link"
import Icon from "./common/Icon"
import UserCard from "./user/UserCard"

import { HiOutlineMail, HiOutlineInbox } from "react-icons/hi"

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
                <Link href={"/register"}><Button>Join</Button></Link>
              </div>
            )}
            {/* AUTHENTICATED */}
            { status === "authenticated" && (
              <>
                <Button><Link href={"/letters/new"}>New Letter</Link></Button>
                <Link href={"/letters"}><Icon icon={HiOutlineMail} size={20} color="grey"/></Link>
                <Icon icon={HiOutlineInbox} size={20} color="grey"/>
                <UserCard showMenu={true} />
              </>
            )}
            {/* MOBILE NAV */}
        </div>
      </>
    )
    }

export default Navbar