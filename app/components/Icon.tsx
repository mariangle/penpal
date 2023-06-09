import { IconType } from "react-icons/lib";

interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ 
    icon: IconComponent, size, color
}) => {
  return <IconComponent size={size} color={color}/>;
};

export default Icon;
