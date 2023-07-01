import { UseFormRegister, FieldValues } from "react-hook-form";
import { ChangeEventHandler } from "react";
import { Textarea as StyledTextarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"

type TextareaProps = {
    label?: string;
    id: string;
    value?: string;
    rows?: number,
    register?: UseFormRegister<FieldValues>;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    maxLength?: number;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>; 
  }

const Textarea :React.FC<TextareaProps>  = ({
    label,
    id,
    value,
    rows,
    register,
    placeholder,
    required,
    disabled,
    maxLength,
    onChange
}) => {
  return (
    <div className="mb-2">
      <Label htmlFor={id}>
        {label}
      </Label>
      <div className="mt-1">
        <StyledTextarea
          id={id}
          value={value}
          rows={rows}
          disabled={disabled}
          {...(register && register(id, { required }))}
          placeholder={placeholder}
          className="w-full border p-2 rounded-md"
          maxLength={maxLength}
          onChange={onChange}
        />
      </div>
    </div>  
    )
}

export default Textarea