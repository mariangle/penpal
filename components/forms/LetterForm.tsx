"use client"

import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useLetter } from "@/hooks/useLetter";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

const LetterForm = () => {
  const { sendLetter, loading } = useLetter();
  const { user } = useUser();
  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!user) return toast.error("Please log in to send a letter.");
    console.log("sender", data.sender)
    console.log("receiver", data.email)
    if (!data.email || !data.content) return toast.error("Please make sure to fill in all required fields.");
    
    await sendLetter(data);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" label="Email" id="email" register={register} placeholder="example@email.com"/>
        <Input type="text" label="From" id="sender" value={user?.email} disabled/>
        <Textarea label="Content" id="content" register={register} rows={5}/>
        <Input type="text" label="Image URL" id="image" register={register}/>
        <Button type="submit" disabled={loading} className="black_btn">{loading ? "Sending..." : "Send"}</Button>
      </form>
  );
};

export default LetterForm;
