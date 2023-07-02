import getCurrentUser from "@/actions/getCurrentUser";
import LettersList from "@/components/letters/LettersList";
import Letter from "@/components/letters/Letter";

import prismadb from "@/lib/prismadb"
import { notFound, redirect } from "next/navigation";


interface IParams {
  letterId: string;
}

const PendingLettersPage = async ({ params }: { params: IParams }) => {
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

  const letterId = params.letterId;

  if (!/^[0-9a-fA-F]{24}$/.test(letterId)) {
    return notFound();
  }

  const letter = await prismadb.letter.findUnique({
    where: {
      id: params.letterId
    },
    include: {
      sender: true
    }
  })


  return (
    <>
      <LettersList letters={pendingLetters}/>
      <Letter letter={letter}/>
    </>
  )
}

export default PendingLettersPage;