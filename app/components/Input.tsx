import { UseFormRegister, FieldValues } from "react-hook-form"

interface InputProps{
    label: string,
    id: string,
    type: string,
    register: UseFormRegister<FieldValues>,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
}

const Input : React.FC<InputProps> =  ({
    label, id, type, register, placeholder, required, disabled
}) => {
  return (
    <div>
        <label htmlFor={id} className="block text-sm font-medium loading-6 text-gray-900">
            {label}
        </label>
        <div className="mt-1">
            <input 
                type={type} 
                id={id} 
                disabled={disabled}
                {...register(id, { required })} 
                placeholder={placeholder}
                className='w-full border p-2 mb-4 rounded-md'
            />
        </div>
    </div>
  )
}

export default Input