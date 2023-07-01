"use client"

import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import Loading from "@/components/loading";

import { formatFullDate } from "@/lib/format";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

import useUser from "@/hooks/useUser";

const ProfileForm = () => {
  const { user, updateUser, loading } = useUser();
  const { register, handleSubmit, setValue } = useForm<FieldValues>();
  const [ bioLength, setBioLength ] = useState(0);

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setBioLength(value.length);
  };

  useEffect(() => {
      setValue("name", user?.name);
      setValue("image", user?.image);
      setValue("about", user?.about);
      setValue("coverPhoto", user?.coverPhoto);
      setValue("dob", user?.dob);

      if (user?.about) {
        setBioLength(user.about.length);
      }
  }, [user]);

  const handleUpdateUser: SubmitHandler<FieldValues> = async (data) => {
    await updateUser(data);
  };

  if (!user) return <Loading />;

  return (
    <form onSubmit={handleSubmit(handleUpdateUser)}>
      <Input label="Name" id="name" type="text" register={register} maxLength={10} />
      <Input label="Profile Image URL" id="image" type="text" register={register} />
      <Textarea
        label="Bio"
        id="about"
        rows={2}
        register={register}
        maxLength={150}
        onChange={handleBioChange}
      />
      <div className="text-muted-foreground text-sm mb-4">
        {150 - bioLength} characters left.
      </div>
      <Input label="Cover Image URL" id="coverPhoto" type="text" register={register} />
      <Input label="Date of Birth" id="dob" type="date" register={register} />
      <div className="mt-4 flex-between">
          <div className="text-muted-foreground text-sm">
              Last Updated:{" "}
              {user?.updatedAt && (
                formatFullDate(new Date(user.updatedAt))
              )}
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
