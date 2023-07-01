import AuthForm from "@/components/forms/AuthForm"

import { getSession } from "@/lib/session"
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getSession();

  if (session) redirect("/")

  return <AuthForm variant="Login"/>
}

export default Login