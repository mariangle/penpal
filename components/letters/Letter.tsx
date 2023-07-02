  "use client"
import { formatDate } from "@/lib/format";

import { ILetter } from "@/common.types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getLetter } from "@/actions/getLetter";

const Letter = () => {
  const [letter, setLetter] = useState<ILetter | undefined>(undefined);
  const { letterId } = useParams();

  useEffect(() => {
    getLetter(letterId).then((letter) => setLetter(letter))
  }, [letterId]);

  if (!letter) return null;

  return (
    <div className="w-full bg-white p-4 shadow-xl min-h-[80vh] text-black">
       {/* SENDER INFORMATION */}
      <div className="flex flex-col items-end mb-4">
        <div>
          <div>{letter.sender?.name}</div>
          <div>{letter.sender?.email}</div>
          <div>{letter.sender.country}</div>
          <div>{formatDate(letter.createdAt)}</div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: letter.content}} />
    </div>
  )
}

export default Letter