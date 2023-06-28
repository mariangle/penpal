import axios from "axios";
import { IUser } from "@/common.types";

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};