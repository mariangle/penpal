import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { FieldValues } from "react-hook-form";
import { ILetter } from "@/common.types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"
import { calculateLetterArrival } from "../actions/getArrival";
import { handleError } from "../lib/error";

export const useLetter = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [ sentLetters, setSentLetters ] = useState<ILetter[]>([]);
  const [ receivedLetters, setReceivedLetters ] = useState<ILetter[]>([]);
  const [ pendingLetters, setPendingLetters ] = useState<ILetter[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);

  const sendLetter = async (data: FieldValues) => {
    try {
      setLoading(true);

      const foundUser = await axios.get(`/api/getUserId`, {
        params: { email: data.email },
      });
      

      if (!user) return toast.error('You must be logged in to send a letter');
      if (user.email === foundUser.data.email) toast.error('You cannot send yourself a letter');

      const arrival = await calculateLetterArrival(user.country, foundUser.data.country);

      const updatedData = {
        ...data,
        senderId: user.id,
        receiverId: foundUser.data.id,
        arrivalAt: arrival.arrivalDate
      };

      const response = await axios.post('/api/letters', updatedData);

      toast.success(`Letter sent! It will arrive in ${arrival.deliveryDays} days.`);
      router.push(`/letters/pending/${response.data.id}`)

    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  

  const getLetters = async () => {
    try {
      setLoading(true);
      const { data: letters} = await axios.get("/api/letters",)

      const sent = letters.filter((letter: ILetter) => {
        return letter.senderId === user?.id && new Date(letter.arrivalAt) <= new Date();
      });

      const pending = letters.filter((letter: ILetter) => {
        return letter.senderId === user?.id && new Date(letter.arrivalAt) >= new Date();
      });     

      const received = letters.filter((letter: ILetter) => {
        return letter.receiverId === user?.id && new Date(letter.arrivalAt) <= new Date();
      });

      setSentLetters(sent);
      setReceivedLetters(received);
      setPendingLetters(pending)
    } catch (error) {
      console.log("Error retrieving letters:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendLetter,
    sentLetters,
    pendingLetters,
    receivedLetters,
    getLetters,
    loading,
  };
};

export default useLetter;
