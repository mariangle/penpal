"use client"

import Input from "@/app/components/Input"
import Textarea from "@/app/components/Textarea"
import Button from "@/app/components/Button"

import { useFormatFullDate } from "@/app/util/useFormatDate"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { IUser } from "@/app/types/User"
import { useEffect, useState } from "react"
import axios from "axios"

const ProfileForm = ({ user } : {user: IUser}) => {
  const { register, handleSubmit, setValue } = useForm<FieldValues>()
  const [ data, setData ] = useState<IUser | undefined>(undefined)

  useEffect(() => {
    setData(user)
    if (user) {
      setValue("name", user.name)
      setValue("image", user.image)
      setValue("about", user.about)
      setValue("country", user.country)
      setValue("age", user.age)
    }
  }, [user, setValue])

  const updateUser: SubmitHandler<FieldValues> = async (data) => {
    console.log("userId", user.id);
    console.log("data", data);
  
    const response = await axios.put(`/api/users/${user.id}`, {
      ...data,
      userId: user.id
      });
  
    console.log('response:', response.data);
  };

  return (
    <form onSubmit={handleSubmit(updateUser)}>
      <Input label="Name" id="name" type="text" register={register} />
      <Input label="Profile Image" id="image" type="text" register={register} />
      <Textarea label="Bio" id="about" rows={5} register={register} />
      <Input label="Country" id="country" type="text" register={register} />
      <Input label="Age" id="age" type="number" register={register} />
      <div className="flex gap-2 items-center justify-between">
        <div className="text-gray-600 text-sm">
          Last Updated {data?.updatedAt && useFormatFullDate(new Date(data.updatedAt).toLocaleString())}
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

export default ProfileForm
