import { IconType } from "react-icons"

interface AuthSocialButtonProps {
    icon: IconType,
    color?: string,
    onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    color,
    onClick
}) => {
  return (
    <button type="button" onClick={onClick} className="inline-flex w-full justify-center rounded-md p-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mb-2">
        <Icon />
    </button>
  )
}

export default AuthSocialButton