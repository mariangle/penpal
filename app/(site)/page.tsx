import ProfileCard from "../components/UserCard"
import Loading from "../components/Loading"
import { IUser } from "@/common.types";

async function fetchUsers() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Home = async () => {
  const users: IUser[] = await fetchUsers();
  
  return (
    <div className="flex-center flex-col items-center w-full">
      <div className="min-h-[30vh] grid content-center my-6">
        <h1 className="head_text text-center">
          Discover <span className="orange_gradient text-center">PenPals</span>
        </h1>
        <p className="desc text-center">
        Experience the nostalgia of writing a traditional letter in a digital world. Connect with penpals worldwide and enjoy the anticipation of heartfelt messages that arrive at their own pace.</p>
      </div>
      <div className="feed">
      {users.length === 0 ? (
        <Loading />
      ) : (
        users?.map((user: IUser) => (
          <ProfileCard key={user.id} user={user} />
        ))
      )}
    </div>
    </div>
  )
}

export default Home
