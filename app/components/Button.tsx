interface ButtonProps {
    style? : "primary" | "black" | "red" | "white" | "transparent" | undefined;
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
        className={`rounded-full transition-all text-center text-sm font-inter 
        ${style === "black" ? "black_btn" :
          style === "white" ? "white_btn" :
          style === "primary" ? "primary_btn" :
          style === "red" ? "red_btn" :
          style === "transparent" ? "transparent_btn" :
          ""} 
        ${fullWidth ? "w-full" : ""} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >      
        {children}
    </button>
  )
}

export default Button