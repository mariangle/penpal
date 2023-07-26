"use client"

import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";

import { formatFullDate } from "@/lib/format";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

import { IUser } from "@/common.types";
import { toast } from "react-hot-toast";
import { handleError } from "@/lib/error";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
  user: IUser;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
  user
}) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const router = useRouter();

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
  },[user?.about, user?.coverPhoto, user?.dob, user?.image, user?.name, setValue]);

  const onUpdate: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true) 
    try {
      if (user.email === 'test@email.com') {
        throw new Error('You do not have permission to edit this profile.');
    }     
      await axios.put(`/api/users/{userId}`, data);
      toast.success("Your profile has been updated.");
      router.refresh();
    } catch (err) {
      handleError(err)
    } finally { 
      setIsLoading(false) 
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
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
          <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save"}</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
