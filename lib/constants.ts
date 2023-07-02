import { FaHourglassHalf, FaInbox, FaPaperPlane } from "react-icons/fa"

export const SIDEBAR_LINKS = [
  { to: "inbox", label: "Inbox", icon: FaInbox},
  { to: "sent", label: "Sent", icon: FaPaperPlane},
  { to: "pending", label: "Pending", icon: FaHourglassHalf}
]
// messages
export const COUNTRY_INFO_MESSAGE = "We retrieve your country information based on your IP address to provide a personalized experience."