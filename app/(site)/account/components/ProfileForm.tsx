"use client"

import Input from "@/app/components/Input";
import Textarea from "@/app/components/Textarea";
import Button from "@/app/components/Button";

import { useFormatFullDate } from "@/app/hooks/useUtil";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { IUser } from "@/app/types/User";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "@/app/context/UserContext";

const ProfileForm = () => {
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, setValue } = useForm<FieldValues>();
  const [data, setData] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    setData(user);
    if (user) {
      setValue("name", user.name);
      setValue("image", user.image);
      setValue("about", user.about);
      setValue("country", user.country);
      setValue("dob", user.dob);
    }
  }, [user, setValue]);

  const updateUser: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await axios.put(`/api/users/${user?.id}`, {
        ...data,
        userId: user?.id,
      });
      setUser(response.data);
      toast.success("Your profile has been updated.");
    } catch (err) {
      toast.error("An error occurred.");
      console.log("Error updating user:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(updateUser)}>
      <Input label="Name" id="name" type="text" register={register} />
      <Input label="Profile Image URL" id="image" type="text" register={register} />
      <Textarea label="Bio" id="about" rows={5} register={register} />
      <Input label="Country" id="country" type="text" register={register} />
      <Input label="Date of Birth" id="dob" type="date" register={register} />
      <div className="flex gap-2 items-center justify-between">
        <div className="text-gray-600 text-sm">
          Last Updated{" "}
          {data?.updatedAt &&
            useFormatFullDate(new Date(data.updatedAt).toLocaleString())}
        </div>
        <div>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
