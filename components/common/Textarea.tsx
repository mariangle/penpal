import { UseFormRegister, FieldError } from "react-hook-form";
import { ChangeEventHandler, TextareaHTMLAttributes } from "react"; 
import { Textarea as StyledTextarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"

type TextareaProps = {
    label?: string;
    id: string;
    register?: UseFormRegister<any>;
    placeholer?: string;
    required?: boolean;
    validation?: FieldError;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>; 
} & TextareaHTMLAttributes<HTMLTextAreaElement>; 

const Textarea: React.FC<TextareaProps> = ({
    label,
    id,
    register,
    required,
    onChange,
    validation,
    ...rest 
}) => {
  return (
    <div className="mb-2">
      <Label htmlFor={id}>
        {label}
      </Label>
      <StyledTextarea
        {...(register && register(id, { required }))}
        className="w-full border p-2 rounded-md mt-1"
        onChange={onChange}
        {...rest} 
      />
      {validation && <p className="mt-2 text-xs text-red-500">This field cannot be empty.</p>}
    </div>  
    )
}

export default Textarea