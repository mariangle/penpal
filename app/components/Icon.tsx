import { IconType } from "react-icons/lib";

interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
  background?: boolean;
}

const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size,
  color,
  background
}) => {
  if (background) {
    return (
      <div className={`rounded-full p-1 bg-${color} bg-[${color}]`}>
        <IconComponent size={size} color="white" />
      </div>
    );
  }

  return <IconComponent size={size} color={color} />;
};

export default Icon;
