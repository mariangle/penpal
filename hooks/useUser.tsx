"use client"
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { IUser } from "@/common.types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues } from "react-hook-form";
import { signOut } from "next-auth/react";

const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  const [ loading, setLoading ] = useState<boolean>(false);

  const getUserById = async (userId: string): Promise<IUser | undefined> => {
    try {
      const response = await axios.get(`/api/users/${userId}`, {
        params: { userId: userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return undefined;
    }
  };

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
      toast.error("An error occurred.");
      console.log("Error updating user:", err);
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
      toast.error("Something went wrong")
  }
  };  

  return {
    user,
    setUser,
    updateUser,
    loading,
    getUserById,
    isCurrentUser,
    deleteUser,
  };
};

export default useUser;
