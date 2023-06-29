import ProfileCard from "../components/UserCard"
import { IUser } from "@/common.types";
import prisma from "@/lib/prismaClient"

const Home = async () => {
  const users = await prisma.user.findMany()

  return (
    <div className="flex-center flex-col items-center w-full">
      <div className="min-h-[30vh] grid content-center my-6">
        <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-center">
          Discover <span className="orange_gradient text-center">PenPals</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl max-w-2xl text-center">
        Experience the nostalgia of writing a traditional letter in a digital world. Connect with penpals worldwide and enjoy the anticipation of heartfelt messages that arrive at their own pace.</p>
      </div>
      <div className="feed">
        {users?.map((user: IUser) => (
            <ProfileCard key={user.id} user={user} />
          ))}
      </div>
    </div>
  )
}

export default Home
