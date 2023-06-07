"use client"

import { createContext, useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import axios from "axios";
import { User } from "../types/User";

interface UserContextType {
  user: User | undefined;
}

export const UserContext = createContext<UserContextType>({ user: undefined });

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/currentUser", {
          params: { email: session?.user?.email },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchCurrentUser();
  }, [session]);

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider