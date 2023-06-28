"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import axios from "axios";

import { toast } from "react-hot-toast";
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
  
  const login = (data: FieldValues) => {
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

  const register = (data: FieldValues) => {
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
    login,
    register,
    loading,
    data,
    handleSubmit,
  };
};
  
  export default useAuth;