import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { FieldValues } from "react-hook-form";
import { ILetter } from "../types/Letter";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"

export const useLetter = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendLetter = async (data: FieldValues) => {
    try {
      setLoading(true);

      const foundUser = await axios.get(`/api/getUserId`, {
        params: { email: data.email },
      });

      if (!foundUser.data) {
        throw new Error('Email not found');
      }

      const updatedData = {
        ...data,
        senderId: user?.id,
        receiverId: foundUser.data.id,
      };
      const response = await axios.post('/api/letters', updatedData);

      toast.success('Letter sent successfully!');
      setLoading(false);
      router.push("/")

      return response.data;
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || error.message);
      } else {
        toast.error("Unexpected error");
      }
    }
  };
  

  const getLetters = async () => {
    try {
      setLoading(true);
  
      if (user?.id) {
        const response = await axios.get("/api/letters", {
          params: { userId: user.id },
        });
    
        setLetters(response.data);
       }
    } catch (error) {
      console.log("Error retrieving letters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLetters();
  }, []); 

  return {
    sendLetter,
    letters,
    loading,
  };
};
