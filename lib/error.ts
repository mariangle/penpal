import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

// translates the status codes from the server into user friendly messages
export const handleAxiosError = (error: AxiosError) => {
  const { response } = error;
  if (response?.status === 400) {
    toast.error("Missing fields. Please ensure all required fields are filled.");
  } else if (response?.status === 401) {
    toast.error("Server responded with an unauthorized access error.");
  } else if (response?.status === 404) {
    toast.error("Server error. The requested resource could not be found.");
  } else if (response?.status === 500) {
    toast.error("Something went wrong on the server. Please try again later.");
  } else {
    toast.error("An unexpected error occurred.");
  }
};

// displays the errors that a functions throws
export const handleGeneralError = (error: Error) => {
  toast.error(error.message);
};

// check if a client or server error occured and call function
export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    handleAxiosError(error);
  } else if (error instanceof Error) {
    handleGeneralError(error);
  }
};