"use client"

import { useSession, signIn, signOut } from "next-auth/react"

const Nav = () => {
    const { data: session, status } = useSession()
    const userEmail = session?.user?.email
    console.log(session)

    if (status === "loading") {
        return <p>Hang on there...</p>
      }
    
      if (status === "authenticated") {
        return (
          <>
            <p>Signed in as {userEmail}</p>
            <button onClick={() => signOut()}>Sign out</button>
            <img src={session?.user?.image || "https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png"} />
          </>
        )
      }
    
      return (
        <>
          <p>Not signed in.</p>
          <button onClick={() => signIn("github")}>Sign in</button>
        </>
      )
    }

export default Nav