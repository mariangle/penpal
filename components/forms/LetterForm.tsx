"use client"

import Link from "next/link";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Editor from "@/components/Editor";

import { buttonVariants } from "../ui/button";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useLetter } from "@/hooks/useLetter";
import { toast } from "react-hot-toast";
import { IUser } from "@/common.types";
import { useEffect } from "react";

interface LetterFormProps {
  recipient: IUser;
  user: IUser | null;
}

const LetterForm: React.FC<LetterFormProps> = ({ recipient, user }) => {
  const { sendLetter, loading } = useLetter();
const { register, handleSubmit, setValue, getValues } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!user) return toast.error("Please log in to send a letter.");
    if (!data.email  || !data.content) return toast.error("Please make sure to fill in all required fields.");
  
    sendLetter(data);
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
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
  );
};

export default LetterForm;
