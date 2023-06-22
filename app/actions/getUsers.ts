import axios from "axios";
import { IUser } from "../types/User";
import prisma from "@/app/libs/prismadb"
import getSession from "./getSession";

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};