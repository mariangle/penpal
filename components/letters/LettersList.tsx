
"use client"

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Letter, User } from "@prisma/client";
import { useParams, usePathname } from "next/navigation";
import { formatDate } from "@/lib/format";
import { useEffect, useState } from "react";

interface ExtendedLetter extends Letter {
  sender: User;
}

const LettersList: React.FC<{ letters: ExtendedLetter[] }>= ({ letters }) => {
  const [ items, setItems] = useState<ExtendedLetter[]>([]); // prevent hydration error
  const { letterId } = useParams();
  const pathname = usePathname();
  const category = pathname.split('/')[2];

  useEffect(() => {
    setItems(letters)
  }, [])

  return (
    <div className="w-full min-h-[100px] lg:max-w-[300px] border border-gray-200 rounded-lg dark:border-slate-800 dark:bg-black bg-white bg-opacity-80 dark:bg-opacity-20">
      <div className="m-4 border border-gray-200 rounded-lg dark:border-slate-800 dark:bg-black bg-white bg-opacity-80 dark:bg-opacity-20">
        {items.length === 0 ? (
          <div className="border-b p-4">No letters yet.</div>
        ) : (
          items.map((letter) => (
            <Link
              key={letter.id}
              className={cn(
                "block border-b p-4", 
                letter.id === letterId ? "bg-gray-50 dark:bg-slate-900" : "")}
              href={`/letters/${category}/${letter.id}`}
            >
              <div className="flex-between text-semibold truncate">
                <div>
                  From: {letter.sender.name}
                </div>
                <div className="text-xs">
                  {formatDate(letter.createdAt)}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default LettersList;