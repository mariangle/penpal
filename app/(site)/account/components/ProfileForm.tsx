"use client"

import Input from "@/app/components/Input";
import Textarea from "@/app/components/Textarea";
import Button from "@/app/components/Button";

import useFormat from "@/app/hooks/useFormat";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { IUser } from "@/app/types/User";
import { useEffect, useState } from "react";
import useUser from "@/app/hooks/useUser";

const ProfileForm = () => {
  const { formatFullDate } = useFormat();
  const { user, updateUser, loading } = useUser();
  const { register, handleSubmit, setValue } = useForm<FieldValues>();
  const [data, setData] = useState<IUser | undefined>(undefined);
  const [bioLength, setBioLength] = useState(0);

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setBioLength(value.length);
  };

  useEffect(() => {
    setData(user);
    if (user) {
      setValue("name", user.name);
      setValue("image", user.image);
      setValue("about", user.about);
      setValue("coverPhoto", user.coverPhoto);
      setValue("dob", user.dob);

      if (user.about) {
        setBioLength(user.about.length);
      }
    }
  }, [user, setValue]);

  const handleUpdateUser: SubmitHandler<FieldValues> = async (data) => {
    if (user) {
      await updateUser(data, user.id);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateUser)}>
      <Input label="Name" id="name" type="text" register={register} maxLength={10}/>
      <Input label="Profile Image URL" id="image" type="text" register={register} />
      <Textarea
        label="Bio"
        id="about"
        rows={2}
        register={register}
        maxLength={150}
        onChange={handleBioChange}
      />
      <div className="text-gray-600 text-sm mb-4">
        {150 - bioLength} characters left.
      </div>
      <Input label="Cover Image URL" id="coverPhoto" type="text" register={register} />
      <Input label="Date of Birth" id="dob" type="date" register={register} />
      <div className="flex gap-2 items-center justify-between">
      <div className="text-gray-600 text-sm">
        Last Updated:{" "}
        {data?.updatedAt && (
          formatFullDate(new Date(data.updatedAt))
        )}
      </div>
        <div>
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
