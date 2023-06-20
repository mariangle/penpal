"use client"

import Input from "@/app/components/Input";
import Textarea from "@/app/components/Textarea";
import Button from "@/app/components/Button";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useLetter } from "@/app/hooks/useLetter";
import { useContext, useState } from "react";
import { UserContext } from "@/app/context/UserContext";

const LetterForm = () => {
  const { sendLetter, loading } = useLetter();
  const { user } = useContext(UserContext);

  const { register, handleSubmit } = useForm<FieldValues>();
  const [ recipientType, setRecipientType ] = useState<string>('specific');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const letterData = { ...data, recipientType };
    await sendLetter(letterData);
  };


  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" label="Email" id="email" register={register} placeholder="example@email.com" />
        <Input type="text" label="From" id="sender" value={user?.email} disabled/>
        <Textarea label="Content" id="content" register={register} rows={5}/>
        <Input type="text" label="Image URL" id="image" register={register}/>
        <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send"}</Button>
      </form>
  );
};

export default LetterForm;
