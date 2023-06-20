"use client"

import Input from "@/app/components/Input"
import Button from "@/app/components/Button"
import AuthSocialButton from "./AuthSocialButton"
import PasswordField from "./PasswordField"
import { BsGithub, BsGoogle } from "react-icons/bs"

import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation"
import { getCountry } from "@/app/actions/userActions"
import { useEffect, useState } from "react"

interface AuthFormProps {
  variant: 'Login' | 'Register'
}

const AuthForm = ({ variant }: AuthFormProps) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<FieldValues>({})
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    if (variant === 'Register') {
      getCountry().then((country) => {
        setValue('country', country); 
      });
    }
  }, [setValue, variant]);

  const socialAction = (action : string) => {
    signIn(action, { redirect: false })
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true); 

    if (variant === "Register") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Registered succesfully!");
          router.push("/login");
        })
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data;
            toast.error(errorMessage);
          } else {
            toast.error("Error occurred");
          }
        })
        .finally(() => {
          setLoading(false); 
        })
      }

    if (variant === "Login") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            router.push("/");
            toast.success("Welcome back!");
          }
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            { variant === "Register" && (
              <Input type="text" id="name" label="Name" register={register} maxLength={10}/>
            )}
              <Input type="email" id="email" label="Email" register={register}/>
              <PasswordField id="password" label="Password" register={register}/>
            { variant === "Register" && (
              <div className="flex gap-2">
                <Input type="date" id="dob" label="Date of Birth" register={register} />
                <Input type="text" id="country" label="Country" register={register} disabled info="We retrieve your country information based on your IP address to provide a personalized experience."/>
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