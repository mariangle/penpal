import AuthForm from "@/components/forms/AuthForm"

import { getSession } from "@/lib/session"
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getSession();

  if (session) redirect("/")

  return (
    <div className='min-h-[90vh] flex flex-col justify-center w-full max-w-[27.5rem] mx-auto items-center'>
        <div className="mt-4 w-full mx-auto rounded-xl border border-gray-200 p-4  bg-white bg-opacity-70 md:p-6">
          <div className="my-4">
            <h1 className="text-4xl text-center font-bold mt-4 blue_gradient">Login</h1>
            <p className="text-gray-500 my-4 text-sm text-center">Sign in to your account.</p>
          </div>
          <AuthForm variant="Login"/>
        </div>
    </div>
  )
}

export default Login