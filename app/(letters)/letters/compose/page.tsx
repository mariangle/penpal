import LetterForm from "@/components/forms/LetterForm"
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const NewLetterPage = async () => {
  const session = await getSession();

  if (!session) redirect("/login")

  return <LetterForm />
}

export default NewLetterPage