import useFormat from "@/app/hooks/useFormat"

import { ILetter } from "@/app/types/Letter"

const Letter = ({ letter }: { letter: ILetter }) => {
  const { formatDate } = useFormat();

  return (
    <div>
       {/* SENDER INFORMATION */}
      <div className="flex flex-col items-end mb-4">
        <div>
          <div>{letter.sender?.name}</div>
          <div>{letter.sender?.email}</div>
          <div>{letter.sender.country}</div>
          <div>{formatDate(letter.createdAt)}</div>
        </div>
      </div>
      {letter.content}
    </div>
  )
}

export default Letter