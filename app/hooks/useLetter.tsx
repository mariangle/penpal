import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { FieldValues } from "react-hook-form";
import { ILetter } from "../types/Letter";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"

export const useLetter = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [sentLetters, setSentLetters] = useState<ILetter[]>([]);
  const [receivedLetters, setReceivedLetters] = useState<ILetter[]>([]);
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
      router.push("/")

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || error.message);
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoading(false)
    }
  };
  

  const getLetters = async () => {
    try {
      setLoading(true);
  
      if (user?.id) {
        const response = await axios.get("/api/letters", {
          params: { userId: user.id },
        });
        const allLetters = response.data;
        const sent = allLetters.filter((letter: ILetter) => letter.senderId === user.id);
        const received = allLetters.filter((letter: ILetter) => letter.receiverId === user?.id);

        setSentLetters(sent);
        setReceivedLetters(received);
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
    sentLetters,
    receivedLetters,
    loading,
  };
};
