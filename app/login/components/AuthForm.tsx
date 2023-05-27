"use client"

import Input from "@/app/components/Input"
import Button from "@/app/components/Button"
import AuthSocialButton from "./AuthSocialButton"
import PasswordField from "./PasswordField"

import { BsGithub, BsGoogle, BsFacebook, BsDiscord } from "react-icons/bs"


import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {

  const socialAction = (action : string) => {
    signIn(action, { redirect: false })
  };

  const toastTest = () => {
    toast.success("Logged in successfully!");
  }

  return (
    <div>
      <Input type="text" id="email" label="Email"/>
      <PasswordField id="password" label="Password"/>
      <Button fullWidth>Sign In</Button>
      <div className="relative my-6">
         <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-300">
             </div>
         </div>
         <div className="relative flex justify-center text-sm">
             <span className="bg-white px-2 text-gray-500">
                 Or continue with
             </span>
         </div>
      </div>
      <div>
        <AuthSocialButton onClick={() => socialAction("github")} icon={BsGithub}></AuthSocialButton>
        <AuthSocialButton onClick={toastTest} icon={BsGoogle}></AuthSocialButton>
        <AuthSocialButton onClick={signIn} icon={BsFacebook}></AuthSocialButton>
        <AuthSocialButton onClick={signIn} icon={BsDiscord}></AuthSocialButton>
      </div>
    </div>
  ) 
}

export default AuthForm