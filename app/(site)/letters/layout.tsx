"use client"

import Button from "@/app/components/Button";
import Link from "next/link";
import LettersList from "./components/LettersList";
import { HiInboxIn, HiPencilAlt } from "react-icons/hi"
import { FaPaperPlane, FaHourglassHalf } from "react-icons/fa"
import { usePathname } from "next/navigation"
import { useLetter } from "@/app/hooks/useLetter";

const layout = ({children} : {children : React.ReactNode} ) => {
  const { receivedLetters } = useLetter();
  const pathname = usePathname();

  return (
    <div className="w-full">
        <div className="md:flex gap-4 min-h-[80vh] glassmorphism mt-6">
          <aside className="md:max-w-[12rem] w-full">
              <div className="border-b pb-4 flex md:flex-col justify-between">
                <h1 className="text-2xl font-extrabold blue_gradient mb-4">Mailbox</h1>
                <Link href={"/letter/new"}>
                  <Button fullWidth>
                    <HiPencilAlt />
                    <div>Compose</div>
                  </Button>
                </Link>
              </div>
              <ul className="py-4 flex md:flex-col  gap-4 md:gap-2 text-sm">
                <li>
                  <Link href={"/letters/inbox"} className="flex justify-between gap-2">
                    <div className={`flex gap-2 items-center ${pathname.includes("inbox") ? "text-blue-600" : ""}`}>
                      <HiInboxIn />
                      <div className="font-semibold">Inbox</div>
                    </div>
                    <span className={`text-black flex-center px-1 rounded-md text-xs ${pathname.includes("inbox") ? "bg-blue-700 text-white" : ""}`}>{receivedLetters.length}</span>
                  </Link>
                </li>
                <li>
                  <Link href={"/letters/sent"} className={`flex gap-2 items-center font-semibold ${pathname.includes("sent") ? "text-blue-600" : ""}`}>
                    <FaPaperPlane />
                    <div>Sent</div>
                  </Link>
                </li>
                <Link href={"/letters/pending"} className={`flex gap-2 items-center font-semibold ${pathname.includes("pending") ? "text-blue-600" : ""}`}>
                    <FaHourglassHalf />
                    <div>Pending</div>
                  </Link>
              </ul>
            </aside>
            <div className="bg-gray-100 rounded-lg p-4 w-full flex justify-between border">
              <LettersList />
              {children}
            </div>
        </div>
    </div>
  )
}

export default layout