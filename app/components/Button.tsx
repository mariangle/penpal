interface ButtonProps {
    style? : "primary" | "secondary" | "tertiary" | undefined;
    type? : "submit"
    fullWidth?: boolean;
    onClick?: () => void,
    children?:  React.ReactNode;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  style, type, fullWidth, onClick, children, disabled
}) => {
  return (
    <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center
        ${style === "primary" ? "bg-red-600 hover:bg-red-400 border-none" : 
         style === "secondary" ? "bg-blue-500" : 
         style === "tertiary" ? "bg-yellow-300" :
         fullWidth ? "w-full" : "" }
        ${disabled ? "opacity-50 cursor-default" : ""}`}
        >
        {children}
    </button>
  )
}

export default Button