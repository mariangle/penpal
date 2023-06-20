import { useState } from "react"
import { useParams } from "next/navigation";

import useUser from "./useUser";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { handleError } from "../util/errorHandlers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


const useReview = () => {
    const { user } = useUser();
    const [ loading, setLoading ] = useState<boolean>(false);
    const { userId } = useParams();
    const router = useRouter();

    const postReview = async (data: FieldValues) => {
        try {
          setLoading(true);
          const postData = { ...data, userId, authorId: user?.id };
          await axios.post(`/api/reviews/`, postData);
          toast.success("Review posted!");
          router.push(`/${userId}`)
        } catch (error) {
          handleError(error);
        } finally {
          setLoading(false);
        }
      };

    const editReview = (data: FieldValues) => {
    
    }

    return {
        postReview,
        editReview,
        loading,
    }
}

export default useReview;