"use client"

import { toast } from "react-hot-toast"
import axios from "axios"
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react"
import { getCountry } from "../actions/userActions";


const useAuth = () => {
  const router = useRouter();
  const { register: data, handleSubmit, setValue } = useForm<FieldValues>({})
  const [ loading, setLoading ] = useState<boolean>(false);
  
  const socialAction = (action : string) => {
      signIn(action, { redirect: false })
  };

  useEffect(() => {
        getCountry().then((country) => {
        setValue('country', country); 
      });  
  }, []);
  
    const loginUser = (data: FieldValues) => {
        setLoading(true);
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
    };

    const registerUser = (data: FieldValues) => {
        setLoading(true);
        axios
          .post("/api/users", data)
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
      };
  
    return {
      socialAction,
      login: loginUser,
      register: registerUser,
      loading,
      data,
      handleSubmit,
    };
  };
  
  export default useAuth;