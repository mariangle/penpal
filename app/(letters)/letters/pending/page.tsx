import getCurrentUser from "@/actions/getCurrentUser";
import LettersList from "@/components/letters/LettersList";

import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation";

const SentLettersPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login")

  const currentDate = new Date();

  const pendingLetters = await prismadb.letter.findMany({
    where: {
      senderId: user.id,
      arrivalAt: {
        gt: currentDate
      }
    }, 
    include: {
      sender: true
    }
  });


    return (
        <>
          <LettersList letters={pendingLetters}/>
        </>
    )
}

export default SentLettersPage;