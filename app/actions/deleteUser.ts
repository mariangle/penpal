import axios from "axios";
import { toast } from "react-hot-toast"

export const deleteUser = async (userId: string) => {
    try {
        const response = await axios.delete("/api/currentUser", {
            params: { userId: userId },
          });
        toast.success(response.data)
    } catch (err) {
        console.log("Error occured", err)
    }
  };