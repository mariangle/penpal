"use client"

import Link from "next/link";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Editor from "@/components/Editor";

import { buttonVariants } from "../ui/button";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IUser } from "@/common.types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { handleError } from "@/lib/error";

import axios from "axios";

interface LetterFormProps {
  recipient: IUser;
  user: IUser | null;
}

const LetterForm: React.FC<LetterFormProps> = ({ recipient, user }) => {
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const { register, handleSubmit, setValue, getValues } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!user) return toast.error("Please log in to send a letter.");
    if (!data.email  || !data.content) return toast.error("Please make sure to fill in all required fields.");
  
    setIsLoading(true);
    try {
      const { content, email } = data;
      const response = await axios.post('/api/letters', { content, email });
      const { letter, deliveryDays } = response.data;
      router.push(`/letters/pending/${letter.id}`);
      toast.success(`Letter sent! It will arrive in ${deliveryDays} days.`);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValue("email", recipient.email || ""); 
  }, [recipient.email, setValue]);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" label="To" id="email" value={recipient?.email} placeholder="example@email.com" disabled  register={register}/>
        <Input type="text" label="From" id="sender" value={user?.email} disabled />
        <Editor value={getValues("content")} onChange={(content) => setValue("content", content)} recipient={recipient}/>
        <div className="flex-gap mt-4">
          <Link href={`/${recipient?.id}`} className={buttonVariants({ variant: "secondary" })}>Cancel</Link>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
  );
};

export default LetterForm;
