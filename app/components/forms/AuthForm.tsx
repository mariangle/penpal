"use client"

import Input from "@/app/components/Input"
import Button from "@/app/components/Button"
import AuthSocialButton from "../auth/AuthSocialButton"
import PasswordField from "../auth/PasswordField"
import { BsGithub, BsGoogle } from "react-icons/bs"

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation"
import useAuth from "@/app/hooks/useAuth"

interface AuthFormProps {
  variant: 'Login' | 'Register'
}

const AuthForm = ({ variant }: AuthFormProps) => {
  const router = useRouter();
  const { data, loading, login, register, socialAction, handleSubmit } = useAuth();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === "Register") {
      register(data);
    }

    if (variant === "Login") {
      login(data)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            { variant === "Register" && (
              <Input type="text" id="name" label="Name" register={data} maxLength={10}/>
            )}
              <Input type="email" id="email" label="Email" register={data}/>
              <PasswordField id="password" label="Password" register={data}/>
            { variant === "Register" && (
              <div className="flex gap-2">
                <Input type="date" id="dob" label="Date of Birth" register={data} />
                <Input type="text" id="country" label="Country" register={data} disabled info="We retrieve your country information based on your IP address to provide a personalized experience."/>
              </div>
            )}
            <div>
            <Button type="submit" style="black" disabled={loading} fullWidth>
              {loading && (
                <span>
                  {variant === "Login" ? "Signing In..." : "Signing Up..."}
                </span>
              )}
              {!loading && (variant === "Login" ? "Sign In" : "Sign Up")}
            </Button>
            </div>
          </div>
      </form>
      { variant === "Login" && (
        <>
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
            <AuthSocialButton onClick={() => socialAction("google")} icon={BsGoogle}></AuthSocialButton>
          </div>
        </>
      )}
        <div className="flex gap-2 justify-center text-sm mt-4 åpx-2 text-gray-500">
            <div>
                {variant === "Login" ? "New to PenPal?" : "Already have an account?"}
            </div>
            <div onClick={() => router.push(variant === "Login" ? "/register" : "/login")} className="underline cursor-pointer">
              {variant === "Login" ? "Create an account" : "Login"}
            </div>
        </div>
    </>
  ) 
}

export default AuthForm