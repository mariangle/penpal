import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const SentLettersPage = async () => {
  const session = await getSession();

  if (!session) redirect("/login")
  
    return (
        <>
        </>
    )
}

export default SentLettersPage;