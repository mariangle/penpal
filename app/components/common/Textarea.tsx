import { UseFormRegister, FieldValues } from "react-hook-form";

interface TextareaProps {
    label: string;
    id: string;
    value?: string;
    rows?: number,
    register?: UseFormRegister<FieldValues>;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}

const Textarea :React.FC<TextareaProps>  = ({
    label,
    id,
    value,
    rows,
    register,
    placeholder,
    required,
    disabled
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium loading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={id}
          value={value}
          rows={rows}
          disabled={disabled}
          {...(register && register(id, { required }))}
          placeholder={placeholder}
          className="w-full border p-2 mb-4 rounded-md"
        />
      </div>
    </div>  )
}

export default Textarea