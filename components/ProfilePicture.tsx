import { IUser } from "@/common.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const ProfilePicture: React.FC<{user: IUser}> = ({ user }) => {
  return (
    <Avatar className="w-full h-full">
      {user.image ? (
        <AvatarImage
          src={user.image}
          className="object-cover"
        />
      ) : (
        <AvatarFallback className="text-black">{user.name[0]}</AvatarFallback>
      )}
    </Avatar>
  );
};


