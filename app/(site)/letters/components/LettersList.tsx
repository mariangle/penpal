import { useContext, useEffect, useState } from "react";
import { useLetter } from "@/app/hooks/useLetter";
import { formatDate } from "@/app/util/formatUtils";
import Link from "next/link";

import { usePathname } from "next/navigation"
import { ILetter } from "@/app/types/Letter";
import { UserContext } from "@/app/context/UserContext";


const LettersList = () => {
  const { user } = useContext(UserContext)
  const { receivedLetters, pendingLetters, sentLetters, loading, getLetters } = useLetter();
  const [ letters, setLetters ] = useState<ILetter[]>([])
  const pathname = usePathname();

  useEffect(() => {
    const fetchLetters = async () => {
      await getLetters();
    };

    if (user) {
      fetchLetters();
    }
  }, [user]);

  useEffect(() => {
    if (pathname.includes("inbox")) setLetters(receivedLetters);
    else if (pathname.includes("sent")) setLetters(sentLetters);
    else if (pathname.includes("pending")) setLetters(pendingLetters);
  }, [pathname, receivedLetters, sentLetters, pendingLetters]);

  if (loading) return null;

  return (
    <div className="flex flex-col items-start border p-2 md:max-w-[12rem] w-full rounded-md bg-zinc-100 min-h-[20vh]">
      {letters?.map((letter) => (
        <Link key={letter.id} className="max-h-48 inline-block w-full" href={`${pathname}/${letter.id}`}>
          <div className="p-2 rounded-md">
            <h5 className="font-bold text-blue-600 whitespace-nowrap text-xs">
              {formatDate(letter.createdAt)}
            </h5>
            <h4 className="font-bold text-xs">{letter.sender.email}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LettersList;
