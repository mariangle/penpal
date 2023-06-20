import axios, { AxiosResponse } from "axios";
import { IUser } from "@/app/types/User";

export const getUserById = async (userId: string): Promise<IUser> => {
  try {
    const response: AxiosResponse<IUser> = await axios.get(`/api/users/${userId}`, {
      params: { 
        userId: userId 
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}