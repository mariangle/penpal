interface ButtonProps {
    style? : "primary" | "white" | "transparent" | undefined;
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
        className={`rounded-full border text-white border-black bg-black py-1.5 px-5 transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center
        ${style === "primary" ? "bg-red-600 hover:bg-red-400 border-none" : 
         style === "white" ? "bg-white border-white text-black hover:text-black" : 
         style === "transparent" ? "bg-yellow-300" :
         fullWidth ? "w-full" : "" }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
        {children}
    </button>
  )
}

export default Button