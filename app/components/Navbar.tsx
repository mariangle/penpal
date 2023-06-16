"use client"

import { HiMail, HiOutlineGlobe } from "react-icons/hi"

import Button from "./Button"
import Link from "next/link"
import Icon from "./Icon"
import UserCard from "./AccountCard"

import { usePathname } from "next/navigation"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"


const Navbar = () => {
    const { user } = useContext(UserContext)
      const pathname = usePathname();
    
    return (
      <>
        <div>
          <Link href="/" className="font-bold flex items-center gap-1">
            <HiOutlineGlobe />
            <h1>Pen<span className="orange_gradient">Pal</span></h1>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
            { user ? (
              <>
                { pathname.includes("inbox") && (
                  <Button><Link href={"/letter/new"}>Compose</Link></Button>
                )}
                <Link href={"/inbox"}>
                  <Icon icon={HiMail} size={25} color="lightgrey"/>
                </Link>
                <UserCard showMenu={true} />
              </>
            ) : (
              <div className="flex gap-2 items-center">
                <Link href={"/login"}>Sign In</Link>
                <Link href={"/register"}><button className="outline_btn">Join</button></Link>
              </div>
            )}
        </div>
      </>
    )
    }

export default Navbar