interface ButtonProps {
    style? : "primary" | "red" | "white" | "transparent" | undefined;
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
        className={`rounded-full border text-white border-black bg-black py-1.5 px-5 transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex-center gap-2 
        ${style === "primary" ? " bg-blue-700 hover:bg-blue-600 text-white border-none" :
          style === "white" ? " bg-white border-white text-black hover:text-black" :
          style === "red" ? " bg-red-600 hover:bg-red-400 border-none" :
          style === "transparent" ? " bg-black bg-opacity-70 border-transparent hover:bg-opacity-100 hover:bg-black" :
          ""} 
        ${fullWidth ? "w-full" : ""} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >      
        {children}
    </button>
  )
}

export default Button