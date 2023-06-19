import { useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { HiInformationCircle, HiQuestionMarkCircle } from "react-icons/hi"
import { ChangeEventHandler } from "react";

interface InputProps {
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
}

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
    <div className="w-full">
      <div className="flex gap-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">
          {label}
        </label>
        <div className="relative">
          {getIcon()}
          {showInfo && (
            <div className="absolute top-4 left-0 bg-white p-2 text-sm border">
              {help || info}
            </div>
          )}
        </div>
      </div>
      <div className="mt-1">
        <input
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
          className={`w-full border p-2 mb-4 rounded-md
          ${disabled ? "cursor-not-allowed" : ""}
          `}
        />
      </div>
    </div>
  );
};

export default Input;
