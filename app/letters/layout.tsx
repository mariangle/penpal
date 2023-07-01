"use client"

import Link from "next/link";
import LettersList from "./components/LettersList";
import { Hourglass, Inbox, Send, Pencil } from "lucide-react"
import { usePathname } from "next/navigation"
import { useLetter } from "@/hooks/useLetter";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const layout = ({children} : {children : React.ReactNode} ) => {
  const { receivedLetters } = useLetter();
  const pathname = usePathname();

  return (
    <div className="w-full">
        <div className="md:flex gap-4 h-full glassmorphism mt-6">
          <aside className="md:max-w-[12rem] w-full">
              <div className="border-b pb-4 flex md:flex-col justify-between">
                <h1 className="text-2xl font-extrabold blue_gradient mb-4">Mailbox</h1>
                <Link href={"/letter/new"} className={cn(buttonVariants({variant:"default"}), "rounded-full")}>
                  <Pencil className="mr-2 h-4 w-4"/> Compose
                </Link>
              </div>
              <ul className="py-4 flex md:flex-col  gap-4 md:gap-2 text-sm font-semibold">
                <li>
                  <Link href={"/letters/inbox"} className={`flex-between ${pathname.includes("inbox") ? "text-blue-600" : ""}`}>
                    <div className="flex-gap">
                      <Inbox className="h-4 w-4"/> Inbox
                    </div>
                    <span className={`flex-center px-1 rounded-md text-xs ${pathname.includes("inbox") ? "bg-blue-700 text-white" : ""}`}>{receivedLetters.length}</span>
                  </Link>
                </li>
                <li>
                  <Link href={"/letters/sent"} className={`flex gap-2 items-center font-semibold ${pathname.includes("sent") ? "text-blue-600" : ""}`}>
                    <Send className="h-4 w-4"/> Sent
                  </Link>
                </li>
                <li>
                  <Link href={"/letters/pending"} className={`flex gap-2 items-center font-semibold ${pathname.includes("pending") ? "text-blue-600" : ""}`}>
                    <Hourglass className="h-4 w-4"/> Pending
                  </Link>
                </li>
              </ul>
            </aside>
            <div className="rounded-lg p-4 w-full flex justify-between border">
              <LettersList />
              {children}
            </div>
        </div>
    </div>
  )
}

export default layout