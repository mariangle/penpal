import Link from "next/link"
import Button from "@/components/common/Button"

export default function NotFound() {
  return (
      <div className="h-full flex-center px-4">
        <div className="grid content-center my-6">
          <h1 className="text-5xl font-bold text-center">
            <span className="orange_gradient text-center">Page Not Found</span>
          </h1>
          <p className="text-lg my-4 text-center">
          Ah, the dreaded 404. Let&#39;s get you back on track.
          </p>
          <div>
            <Link href={"/"} className="mx-auto block flex-center">
              <Button className="max-w-[200px]" fullWidth>
                Go back to home page
              </Button>
            </Link>
          </div>
        </div>
      </div>
  )
}