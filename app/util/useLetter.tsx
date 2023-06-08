import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { FieldValues } from "react-hook-form";
import { ILetter } from "../types/Letter";

export const useLetter = () => {
  const { user } = useContext(UserContext);
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [loading, setLoading] = useState(true);

  const sendLetter = async (data: FieldValues) => {
    const foundUser = await axios.get(`/api/currentUser`, {
      params: { email: data.email },
    });    

    const updatedData = {
      ...data,
      senderId: user?.id,
      receiverId: foundUser.data.id
    };

    const response = await axios.post("/api/letters", updatedData);
    return response.data;
  };

  const getLetters = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/letters", {
        params: { userId: user?.id },
      });
      setLetters(response.data);
      console.log(response.data)
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
