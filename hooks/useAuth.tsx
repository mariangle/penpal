"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm,  } from "react-hook-form";
import { signIn } from "next-auth/react";

import axios from "axios";

import { toast } from "react-hot-toast";
import { getCountry } from "../actions/userActions";


export const useAuth = () => {
  const router = useRouter();
  const { register: data, handleSubmit, setValue } = useForm<FieldValues>({})
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
        getCountry().then((country) => {
        setValue('country', country); 
      });  
  }, []);
  
  const login = (data: FieldValues) => {
    const { email, password } = data;
    if (!email || !password) {
      return toast.error("Please provide both email and password.");
    }
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
    const { name, email, password, dob } = data;
    if (!name || !email || !password || !dob) {
      return toast.error("Please fill out all fields.");
    }
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
    login,
    register,
    loading,
    data,
    handleSubmit,
  };
};