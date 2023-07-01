import AuthForm from "@/components/forms/AuthForm"

import { getSession } from "@/lib/session"
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getSession();

  if (session) redirect("/")

  return <AuthForm variant="Register"/>
}

export default Register