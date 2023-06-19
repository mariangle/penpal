"use client"

import { useLetter } from "@/app/hooks/useLetter";
import LettersList from "./LettersList"

const Sidebar = () => {
  const { letters } = useLetter();

  return (
    <aside className="w-full p-4">
        <div className="flex-between border-b pb-4">
          <h1 className="text-2xl font-extrabold blue_gradient">Mailbox</h1>
          {letters?.length ? (
            <p className="text-sm">{letters?.length} letter&#40;s&#41;</p>
          ): (          
            <p className="text-sm">You haven't received any letters.</p>
          )}
        </div>
        <LettersList />
    </aside>
  )
}

export default Sidebar