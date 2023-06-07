"use client"

import Input from "@/app/components/common/Input"
import Button from "@/app/components/common/Button"
import AuthSocialButton from "../auth/AuthSocialButton"
import PasswordField from "../auth/PasswordField"
import { BsGithub, BsGoogle } from "react-icons/bs"


import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation"

interface AuthFormProps {
  variant: 'login' | 'register'
}

const AuthForm = ({ variant }: AuthFormProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: undefined,
      country: "",
    }
  })

  const socialAction = (action : string) => {
    signIn(action, { redirect: false })
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === "register"){
      data.age = parseInt(data.age);
      axios
      .post("/api/register", data)
      .then((response) => {
        const user = response.data;
        toast.success("User registered");
        console.log(user);
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data;
          toast.error(errorMessage);
        } else {
          toast.error("Error occurred");
        }
      });
    }

    if (variant === "login") {
      signIn("credentials", {
          ...data, 
          redirect: false
      })
      .then((callback) => {{
          if (callback?.error){
              toast.error("Invalid credentials")
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in");
            router.push("/"); 
          }
          
      }})
   }
  }

  const handleClick = () => {
    if (variant === 'login') {
      router.push('/register');
    } else if (variant === 'register') {
      router.push('/login');
    }
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            { variant === "register" && (
              <Input type="text" id="name" label="Name" register={register}/>
            )}
            <Input type="email" id="email" label="Email" register={register}/>
            <PasswordField id="password" label="Password" register={register}/>
            { variant === "register" && (
              <div className="flex gap-2">
                <Input type="number" id="age" label="Age" register={register} />
                <Input type="text" id="country" label="Country" register={register}/>
              </div>
            )}
            <div>
              <Button fullWidth type="submit">
                {variant === "login" ? "Sign In" : "Register"}
              </Button>
            </div>
          </div>
      </form>
      { variant === "login" && (
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
            <AuthSocialButton onClick={() => socialAction("github")} icon={BsGoogle}></AuthSocialButton>
          </div>
        </>
      )}
        <div className="flex gap-2 justify-center text-sm mt-6 åpx-2 text-gray-500">
            <div>
                {variant === "login" ? "New to Messenger?" : "Already have an account?"}
            </div>
            <div onClick={handleClick} className="underline cursor-pointer">
                {variant === "login" ? "Create an account" : "Login"}
            </div>
        </div>
    </div>
  ) 
}

export default AuthForm