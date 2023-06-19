import { useState } from "react";
import { useLetter } from "@/app/hooks/useLetter";
import useFormat from "@/app/hooks/useFormat";
import Loading from "@/app/components/Loading";
import Link from "next/link";

const LettersList = () => {
  const { receivedLetters, sentLetters, loading } = useLetter();
  const { formatDate } = useFormat();
  const [viewSent, setViewSent] = useState(false);

  if (loading) return <Loading />;

  const letters = viewSent ? sentLetters : receivedLetters;

  return (
    <div className="flex flex-col items-start gap-6 flex-[1] pt-4">
      <div className="flex gap-2">
        <button
          className={`font-semibold ${
            viewSent ? "text-gray-500" : "text-blue-600"
          }`}
          onClick={() => setViewSent(false)}
        >
          Inbox
        </button>
        <button
          className={`font-semibold ${
            viewSent ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setViewSent(true)}
        >
          Sent
        </button>
      </div>
      {letters?.map((letter) => (
        <Link key={letter.id} className="max-h-48 inline-block w-full" href={`/inbox/${letter.id}`}>
          <div className="flex items-end justify-between gap-4">
            <h4 className="font-bold">{letter.sender.email}</h4>
            <h5 className="font-bold text-blue-600 whitespace-nowrap">
              {formatDate(letter.createdAt)}
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
