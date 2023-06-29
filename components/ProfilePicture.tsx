import { IUser } from "@/common.types";

interface PfpProps {
  user: IUser;
  border?: boolean;
}

const ProfilePicture: React.FC<PfpProps> = ({ user, border }) => {
  if (user?.image) {
    return (
        <img
          src={user?.image}
          alt="pfp"
          className={`rounded-full object-cover w-full h-full ${border ? 'border-white border-4' : ''}`}
        />
    );
  }

  return (
    <div
      className={`bg-gray-200 flex items-center justify-center rounded-full h-full w-full ${border ? 'border-white border-4' : ''}`}
    >
      <span>{"T"}</span>
    </div>
  );
};

export default ProfilePicture;
