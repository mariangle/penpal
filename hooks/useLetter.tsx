import axios from "axios";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"
import { handleError } from "../lib/error";

export const useLetter = () => {
  const router = useRouter();
  const [ loading, setLoading ] = useState<boolean>(false);

  const sendLetter = async (data: FieldValues) => {
    setLoading(true);
    try {
      const { content, email } = data;
      const response = await axios.post('/api/letters', { content, email });
      const { letter, deliveryDays } = response.data;
      router.push(`/letters/pending/${letter.id}`);
      toast.success(`Letter sent! It will arrive in ${deliveryDays} days.`);
      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  return {
    sendLetter,
    loading,
  };
};

export default useLetter;
