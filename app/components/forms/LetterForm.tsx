"use client"

import axios from "axios"
import Input from "@/app/components/Input"
import Button from "@/app/components/Button"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useContext } from "react";

import { UserContext } from "@/app/context/UserContext";

const LetterForm = () => {
  const { user } = useContext(UserContext);

  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("here's the fetched user", user);
    console.log(data);

    const updatedData = {
      ...data,
      senderId: user?.id
    };
    console.log("sent this data ", updatedData)


    const response = await axios.post("/api/letters", updatedData);
    console.log(response.data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" label="To" id="receiverId" register={register} placeholder="John@example.com"/>
        <Input type="text" label="Title" id="title" register={register}/>
        <Input type="text" label="Content" id="content" register={register}/>
        <Input type="text" label="Image" id="image" register={register}/>
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

export default LetterForm;
