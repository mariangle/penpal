import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/app/context/UserContext";
import { FieldValues } from "react-hook-form";

export const useLetter = () => {
  const { user } = useContext(UserContext);

  const sendLetter = async (data: FieldValues) => {
    console.log("raw data",   data)
    // get id from email
    const foundUser = await axios.get(`/api/currentUser`, {
      params: { email: data.email },
    });    

    const updatedData = {
      ...data,
      senderId: user?.id,
      receiverId: foundUser.data.id
    };
    console.log("Sent this data:", updatedData);

    const response = await axios.post("/api/letters", updatedData);
    console.log(response.data);
  };

  return {
    sendLetter,
  };
};
