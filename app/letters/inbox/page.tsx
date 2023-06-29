import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const InboxPage = async () => {
  const session = await getSession();

  if (!session) redirect("/login")
    return (
        <>
        </>
    )
}

export default InboxPage;