import { useContext, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { IUser } from "@/app/types/User";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    if(user?.id === userId) return true;
    return false;
  };

  const updateUser = async (data: any, userId: string) => {
    setLoading(true) 
    try {
      const response = await axios.put(`/api/currentUser`, {
        ...data,
        userId: userId,
      });
      setUser(response.data);
      toast.success("Your profile has been updated.");
    } catch (err) {
      toast.error("An error occurred.");
      console.log("Error updating user:", err);
    } finally { 
      setLoading(false) 
    }
  };

  return {
    user,
    setUser,
    updateUser,
    loading,
    getUserById,
    isCurrentUser,
  };
};

export default useUser;
