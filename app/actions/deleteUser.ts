import axios from "axios";
import { toast } from "react-hot-toast"
import { signOut } from "next-auth/react";

export const deleteUser = async (userId: string) => {
  try {
      const response = await axios.delete("/api/currentUser", {
          params: { userId: userId },
        });
      toast.success(response.data)
      await signOut();
  } catch (err) {
      toast.success("Something went wrong")
  }
};