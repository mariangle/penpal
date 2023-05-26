"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Button from "./Button"

const Navbar = () => {
    const { data: session, status } = useSession()
    
        return (
          <div className="flex fixed w-screen top-0 justify-between bg-green-700 text-white p-2 items-center">
            <div>SnailMail</div>
            { (status === "unauthenticated" || status === "loading") && (
              <div className="flex gap-2 items-center">
                <Button onClick={() => signIn()} style="secondary">Sign in</Button>
              </div>
            )}
            { status === "authenticated" && (
            <div className="flex gap-2 items-center">
              <img src={session?.user?.image || ""} alt="user-profile-image" width={20} height={20} className="rounded-full"/>
              <p>Welcome back, {session?.user?.name}!</p>
              <Button onClick={() => signOut()} style="primary">Sign out</Button>
            </div>
            )}
          </div>
        )
    }

export default Navbar