import { Button as StyledButton } from "@/components/ui/button"
import { Loader2 } from "lucide-react";

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
        {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
    </StyledButton>
  )
}

export default Button