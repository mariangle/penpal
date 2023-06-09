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
        className={`outline_btn
        ${style === "primary" ? "bg-red-700" : 
         style === "secondary" ? "bg-blue-500" : 
         style === "tertiary" ? "bg-yellow-300" :
         fullWidth ? "w-full" : "" }
        `}      
        >
        {children}
    </button>
  )
}

export default Button