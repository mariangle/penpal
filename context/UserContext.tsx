"use client"

import { createContext, useState, useEffect } from "react"
import { useSession, signOut, signIn } from "next-auth/react"
import axios from "axios";
import { IUser } from "@/common.types";

interface UserContextType {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
  signOut: () => Promise<void>;
  signIn: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  signOut: async () => {},
  signIn: async () => {}
});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const [ user, setUser ] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (session?.user?.email){
          const { data: user} = await axios.get("/api/currentUser", {
            params: { email: session?.user?.email },
          });
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchCurrentUser();
  }, [session?.user?.email]);

  return (
    <UserContext.Provider value={{ user, signOut, setUser, signIn }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider