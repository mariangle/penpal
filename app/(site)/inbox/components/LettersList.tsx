
import { useLetter } from "@/app/util/useLetter";
import { useFormatDate } from "@/app/util/useFormatDate";

import Loading from "@/app/components/common/Loading";
import Link from "next/link";

const LettersList = () => {
  const { letters, loading } = useLetter();

  if (loading) return <Loading />
  
  return (
    <div className="flex flex-col gap-6 flex-[1] pt-4">
      {letters?.map((letter) => (
        <Link key={letter.id} className="max-h-48 inline-block w-full" href={`/inbox/${letter.id}`}>
          <div className="flex items-end justify-between gap-4">
            <h4 className="font-bold">{letter.sender.email}</h4> 
            <h5 className="font-bold text-blue-600 whitespace-nowrap">
              {useFormatDate(letter.createdAt.toLocaleString())}
            </h5>
          </div>
          <div>
            <p className="truncate pt-2">{letter.title}</p>
          </div>
        </Link>
        ))}
    </div>
  );
};


export default LettersList;