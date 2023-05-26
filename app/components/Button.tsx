import React from 'react'

interface ButtonProps {
    style? : "primary" | "secondary" | "tertiary" | undefined;
    fullWidth?: boolean;
    onClick?: () => void,
    children?:  React.ReactNode;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  style, fullWidth, onClick, children, disabled
}) => {
  return (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`border p-1 rounded-md 
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