import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const PendingLettersPage = async () => {
  const session = await getSession();

  if (!session) redirect("/login")

    return (
        <>
        </>
    )
}

export default PendingLettersPage;