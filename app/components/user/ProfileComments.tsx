import { IUser } from "@/app/types/User"

const ProfileComments = () => {
  let comments = false;
    return (
        <div className="border">
            <div className="border-b-[1px] p-4 text-blue-900 font-bold">
              Comments
            </div>
        <div className="p-4 flex gap-2">
          {comments ? (
            <div>
                
            </div>
          ) : (
            <div className="text-gray-500 text-base">No Comments</div>
          )}
        </div>
      </div>  )
}

export default ProfileComments