import { useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { HiInformationCircle, HiQuestionMarkCircle } from "react-icons/hi"
import { ChangeEventHandler } from "react";
import { ComponentProps } from "react";
import { Input as StyledInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type InputProps = {
  label?: string;
  id: string;
  type: string;
  value?: string | number
  register?: UseFormRegister<FieldValues>;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  info?: string;
  help?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>; 
} & ComponentProps<"input">

const Input: React.FC<InputProps> = ({
  label, id, type, value, register, 
  placeholder, maxLength, required, disabled, info, help, onChange
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const getIcon = () => {
    return (
      (help || info) && (
        <div
          className="text-gray-300 cursor-pointer"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          {help ? <HiQuestionMarkCircle /> : <HiInformationCircle />}
        </div>
      )
    );
  };

  return (
    <div className="w-full mb-2">
      <div className="flex-between w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id}>
          {label}
        </Label>
        <div className="relative">
          {getIcon()}
          {showInfo && (
            <div className="absolute bottom-4 right-0 bg-white p-2 text-sm border z-50">
              {help || info}
            </div>
          )}
        </div>
      </div>
      <div className="mt-1">
        <StyledInput
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete="on"
          {...(register && register(id, { required }))}
          placeholder={placeholder}
          className={`
          ${disabled ? "cursor-not-allowed" : ""}
          `}
        />
      </div>
    </div>
  );
};

export default Input;
