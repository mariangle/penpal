import useUser from "@/hooks/useUser";
import useLetter from "@/hooks/useLetter";

import Link from "next/link";

import { usePathname, useParams } from "next/navigation"
import { ILetter } from "@/common.types";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/format";

const LettersList = () => {
  const { user } = useUser();
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
  }, [pathname, receivedLetters, sentLetters, pendingLetters, getLetters]);

  if (loading) return null;

  return (
    <div className="flex flex-col items-start border p-2 md:max-w-[12rem] w-full rounded-md min-h-[20vh]">
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
