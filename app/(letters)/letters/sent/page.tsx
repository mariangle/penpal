import getCurrentUser from "@/actions/getCurrentUser";
import LettersList from "@/components/letters/LettersList";

import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation";

const SentLettersPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login")

  const currentDate = new Date();

  const sentLetters = await prismadb.letter.findMany({
    where: {
      senderId: user.id,
      arrivalAt: {
        lt: currentDate
      }
    }, include: {
      sender: true
    }  
  });


    return (
        <>
          <LettersList letters={sentLetters}/>
        </>
    )
}

export default SentLettersPage;