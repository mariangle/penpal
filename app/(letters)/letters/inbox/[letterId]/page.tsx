import getCurrentUser from "@/actions/getCurrentUser";
import LettersList from "@/components/letters/LettersList";
import Letter from "@/components/letters/Letter";

import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation";
import NotFound from "@/app/not-found";

interface IParams {
  letterId: string;
}

const InboxPage = async ({ params }: { params: IParams }) => {
  const user = await getCurrentUser();

  if (!user) redirect("/login")

  const currentDate = new Date();

  const receivedLetters = await prismadb.letter.findMany({
    where: {
      receiverId: user.id,
      arrivalAt: {
        lt: currentDate
      }
    }, include: {
      sender: true
    }
  });

    const letterId = params.letterId;

    if (!/^[0-9a-fA-F]{24}$/.test(letterId)) {
      return NotFound();
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
          <LettersList letters={receivedLetters}/>
          <Letter letter={letter}/>
        </>
    )
}

export default InboxPage;