"use client"

import { FcGlobe } from "react-icons/fc"
import { BsFillEnvelopeFill } from "react-icons/bs"

import Link from "next/link"
import Button from "./Button"
import SearchInput from "./SearchInput"
import UserNavigation from "./UserNavigation"

import { UserContext } from "../context/UserContext"
import { useContext } from "react"


const Navbar = () => {
    const { user } = useContext(UserContext)
    
    return (
      <nav className='flex gap-2 justify-between items-center px-4 py-6 border-b w-full h-16'>
        <div className="flex gap-4 md">
          <Link href="/" className="font-bold flex items-center gap-1">
            <FcGlobe />
            <h1 className="hidden md:block">Pen<span className="orange_gradient">Pal</span></h1>
          </Link>
          <SearchInput />
        </div>
        <div className="flex justify-end gap-4 items-center flex-1">
            { user ? (
              <>
                <Link href={"/letters/inbox"}>
                  <BsFillEnvelopeFill />
                </Link>
                <UserNavigation showMenu={true} />
              </>
            ) : (
              <div className="flex gap-2 items-center">
                <Link href={"/login"}>Log In</Link>
                <Link href={"/register"}>
                  <Button style="black">Join</Button>
                </Link>
              </div>
            )}
        </div>
      </nav>
    )
    }

export default Navbar