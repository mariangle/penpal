"use client"
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues } from "react-hook-form";
import { signOut } from "next-auth/react";
import { handleError } from "@/lib/error";

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  const [ loading, setLoading ] = useState<boolean>(false);

  const isCurrentUser = (userId: string): boolean => {
    return user?.id === userId;
  };

  const updateUser = async (data: FieldValues) => {
    setLoading(true) 
    try {
      const response = await axios.put(`/api/users/{userId}`, data);
      setUser(response.data);
      toast.success("Your profile has been updated.");
    } catch (err) {
      handleError(err)
    } finally { 
      setLoading(false) 
    }
  };

 const deleteUser = async () => {
  try {
      const response = await axios.delete("/api/users/{userId}")
      toast.success(response.data)
      await signOut();
  } catch (err) {
      handleError(err)
  }
  };  

  return {
    user,
    setUser,
    updateUser,
    loading,
    isCurrentUser,
    deleteUser,
  };
};

export default useUser;
