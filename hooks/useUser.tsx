"use client"
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  const isCurrentUser = (userId: string): boolean => {
    return user?.id === userId;
  };

  return {
    user,
    setUser,
    isCurrentUser,
  };
};

export default useUser;
