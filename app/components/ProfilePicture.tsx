import { IUser } from '@/app/types/User';

interface PfpProps {
  user: IUser;
  size?: number;
  border?: boolean;
}

const ProfilePicture: React.FC<PfpProps> = ({ user, size, border }) => {
  if (user?.image) {
    return (
      <img
        src={user?.image}
        alt=""
        width={size}
        height={size}
        className={`rounded-full ${border ? 'border-white border-4' : ''}`}
      />
    );
  }

  return (
    <div
      className={`bg-gray-200 flex items-center justify-center rounded-full ${border ? 'border-white border-4' : ''}`}
      style={{ width: size, height: size }}
    >
      <span>{user?.name[0]}</span>
    </div>
  );
};

export default ProfilePicture;
