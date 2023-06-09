"use client"

import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useLetter } from "@/app/util/useLetter";

const LetterForm = () => {
  const { sendLetter } = useLetter();

  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await sendLetter(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" label="To" id="email" register={register}/>
        <Input type="text" label="Title" id="title" register={register}/>
        <Input type="text" label="Content" id="content" register={register}/>
        <Input type="text" label="Image" id="image" register={register}/>
        <Button type="submit">Send</Button >
      </form>
    </div>
  )
}

export default LetterForm;
