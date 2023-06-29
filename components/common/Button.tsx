import { Button as StyledButton } from "@/components/ui/button"

type ButtonProps = {
    type? : "submit" | "button"
    fullWidth?: boolean;
    onClick?: () => void,
    children?:  React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

const Button: React.FC<ButtonProps> = ({
  type, fullWidth, onClick, children, disabled, className, variant
}) => {
  return (
    <StyledButton
        onClick={onClick}
        type={type}
        disabled={disabled}
        variant={variant}
        className={`transition-all text-center text-sm ${className} 
        ${fullWidth ? "w-full" : ""}`}
        >      
        {children}
    </StyledButton>
  )
}

export default Button