import { IUser } from "@/app/types/User"

const ProfileBio = ({ user }: { user: IUser }) => {
    return (
        <div className="border">
            <div className="border-b-[1px] p-4 text-blue-900 font-bold">
              About Me
            </div>
        <div className="p-4 flex gap-2">
          {user.about ? (
            <div>
                {user.about}
            </div>
          ) : (
            <div className="text-gray-500 text-base">User has not added a bio yet.</div>
          )}
        </div>
      </div>  )
}

export default ProfileBio