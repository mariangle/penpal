"use client"

import Input from "@/app/components/Input";
import Textarea from "@/app/components/Textarea";
import Button from "@/app/components/Button";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useLetter } from "@/app/hooks/useLetter";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";

interface LetterFormProps {
  receiverEmail?: string
}

const LetterForm: React.FC<LetterFormProps> = ({
    receiverEmail
  }) => {
  const { sendLetter, loading } = useLetter();
  const { user } = useContext(UserContext);

  const { register, handleSubmit, setValue } = useForm<FieldValues>();
  const [recipientType, setRecipientType] = useState<string>('specific');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const letterData = { ...data, recipientType };
    await sendLetter(letterData);
  };

  useEffect(() => {
    setValue("email", receiverEmail)
  }, [receiverEmail]);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end gap-4">
          <div>
            <label htmlFor="recipientType" className="block text-sm font-medium text-gray-700 mb-1">
              Recipient
            </label>
            <select
              id="recipientType"
              className="border p-2 mb-4 rounded-md"
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
            >
              <option value="specific">Specific</option>
              <option value="random">Random</option>
            </select>
          </div>
          {recipientType === "specific" && (
            <Input type="text" label="Email" id="email" register={register} placeholder="example@email.com" />
           )}
        </div>
        <Input type="text" label="From" id="sender" value={user?.email} disabled/>
        <Input type="text" label="Letter Title" id="title" register={register}/>
        <Textarea label="Letter Content" id="content" register={register} rows={5}/>
        <Input type="text" label="Image URL" id="image" register={register}/>
        <Button type="submit" disabled={loading}>Send</Button>
      </form>
  );
};

export default LetterForm;
