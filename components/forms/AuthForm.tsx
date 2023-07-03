"use client"

import Link from "next/link"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import PasswordField from "@/components/auth/PasswordField"

import { useAuth } from "@/hooks/useAuth"

import { COUNTRY_INFO_MESSAGE } from "@/lib/constants"
import { FieldValues, SubmitHandler } from "react-hook-form";
import { BsGlobeAmericas } from "react-icons/bs"

const AuthForm = ({ 
  variant 
}: {
  variant: 'Login' | 'Register';
}) => {
  const { data, loading, login, register, handleSubmit } = useAuth();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === "Register") register(data);
    if (variant === "Login") login(data);
  };

  return (
      <div className='h-full flex flex-col justify-center w-full max-w-[25rem] mx-auto items-center'>
        <div className="bg-white rounded-xl border shadow-lg w-full overflow-hidden">
          <div className="p-4 border-b border-gray-200 pt-8 pb-6 flex flex-col gap-1 items-center">
            <BsGlobeAmericas size={35} />
            <h1 className="text-md font-semibold mt-2">{variant === "Login" ? "Sign in to PenPal" : "Create your PenPal account"}</h1>
            <p className="text-sm text-muted-foreground">{variant === "Login" ? "Start connecting with PenPals." : "Get started today."}</p>
          </div>
          <div className="bg-gray-50 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-[20rem] mx-auto">
            {variant === "Register" && (
              <Input type="text" id="name" label="Name" register={data} maxLength={10} />
            )}
            <Input type="email" id="email" label="Email" register={data} />
            <PasswordField id="password" label="Password" register={data} />
            {variant === "Register" && (
              <div className="flex gap-2">
                <Input type="date" id="dob" label="Date of Birth" register={data} />
                <Input type="text" id="country" label="Country" register={data} info={COUNTRY_INFO_MESSAGE} disabled
                />
              </div>
            )}
            <div>
              <Button
                type="submit"
                disabled={loading || variant === "Register"}
                fullWidth
                className="bg-black"
                >
                <span>
                  {loading ? 
                    ( variant === "Login" ? "Signing In..." : "Signing Up..." ) 
                    : 
                    ( variant === "Login" ? "Sign In" : "Sign Up" )
                  }
                </span>
              </Button>
            </div>
          </form>
            <div className="flex gap-2 justify-center text-xs mt-3 text-gray-500">
              <div>{variant === "Login" ? "New to PenPal?" : "Already have an account?"}</div>
              <Link href={variant === "Login" ? "/register" : "/login"} className="underline cursor-pointer">{variant === "Login" ? "Register" : "Login"}</Link>
            </div>
          </div>
        </div>
    </div>
  ) 
}

export default AuthForm