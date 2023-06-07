"use client"

import { createContext, useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import axios from "axios";
import { IUser } from "../types/User";

interface UserContextType {
  user: IUser | undefined;
  signOut: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  signOut: async () => {}
});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (session?.user?.email){
          const response = await axios.get("/api/currentUser", {
            params: { email: session?.user?.email },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchCurrentUser();
  }, [session?.user?.email]);

  return (
    <UserContext.Provider value={{ user, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider