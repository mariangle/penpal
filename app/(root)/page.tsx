import Link from "next/link"
import Feed from "@/components/Feed"

import { BsGithub } from "react-icons/bs"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Home = () => {

  return (
    <div className="flex-center flex-col items-center w-full">
      <section className="flex-center flex-col my-20">
        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15] text-center">
        Discover <span className="orange_gradient">Penpals</span> 
        </h1>
        <p className="mt-5 text-lg sm:text-xl max-w-2xl text-center text-muted-foreground px-4">
        Experience the nostalgia of writing a traditional letter in a digital world. Connect with penpals worldwide and enjoy the anticipation of heartfelt messages that arrive at their own pace.</p>
        <div className="flex-gap justify-center mt-6">
          <Link className={cn(buttonVariants({variant: "default"}))} href={"/register"}>
            Get started
          </Link>
          <a className={cn(buttonVariants({variant: "outline"}))} href={"https://github.com/mariangle/penpal-next-ts"} target="_blank">
            <BsGithub className="h-4 w-4 mr-2" /> Github
          </a>        
        </div>
      </section>
      { /* @ts-expect-error*/ }
      <Feed />
    </div>
  )
}

export default Home
