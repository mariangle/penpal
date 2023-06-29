"use client"

import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import PasswordField from "../auth/PasswordField"

import useAuth from "@/hooks/useAuth"

import { COUNTRY_INFO_MESSAGE } from "@/lib/constants"
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast";

const AuthForm = ({ 
  variant 
}: {
  variant: 'Login' | 'Register';
}) => {
  const router = useRouter();
  const { data, loading, login, register, handleSubmit } = useAuth();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === "Register") {
      const { name, email, password, dob } = data;
      if (!name || !email || !password || !dob) {
        return toast.error("Please fill out all fields.");
      }
      register(data);
    }

    if (variant === "Login") {
      const { email, password } = data;
      if (!email || !password) {
        return toast.error("Please provide both email and password.");
      }
      login(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {variant === "Register" && (
          <Input type="text" id="name" label="Name" register={data} maxLength={10} />
        )}
        <Input type="email" id="email" label="Email" register={data} />
        <PasswordField id="password" label="Password" register={data} />
        {variant === "Register" && (
          <div className="flex gap-2">
            <Input type="date" id="dob" label="Date of Birth" register={data} />
            <Input
              type="text"
              id="country"
              label="Country"
              register={data}
              disabled
              info={COUNTRY_INFO_MESSAGE}
            />
          </div>
        )}
        <div>
          <Button
            type="submit"
            className="primary_btn"
            disabled={loading || variant === "Register"}
            fullWidth
          >
            {loading ? (
              <span>{variant === "Login" ? "Signing In..." : "Signing Up..."}</span>
            ) : (
              <span>{variant === "Login" ? "Sign In" : "Sign Up"}</span>
            )}
          </Button>
          {variant === "Register" && (
            <span className="text-xs">
              Registering is temporarily disabled for security measures.
            </span>
          )}
        </div>
      </form>
      <div className="flex gap-2 justify-center text-sm mt-4 åpx-2 text-gray-500">
        <div>{variant === "Login" ? "New to PenPal?" : "Already have an account?"}</div>
        <div onClick={() => router.push(variant === "Login" ? "/register" : "/login")} className="underline cursor-pointer">
          {variant === "Login" ? "Create an account" : "Login"}
        </div>
      </div>
    </>
  ) 
}

export default AuthForm