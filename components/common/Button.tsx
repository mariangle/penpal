type ButtonProps = {
    type? : "submit" | "button"
    fullWidth?: boolean;
    onClick?: () => void,
    children?:  React.ReactNode;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type, fullWidth, onClick, children, disabled, className
}) => {
  return (
    <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`transition-all text-center text-sm ${className} 
        ${fullWidth ? "w-full" : ""} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >      
        {children}
    </button>
  )
}

export default Button