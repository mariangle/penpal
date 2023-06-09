"use client"

import { ILetter } from '@/app/types/Letter';
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import axios from 'axios';
import Loading from '@/app/components/Loading';

const Letter = () => {
  const [letter, setLetter] = useState<ILetter | undefined>(undefined);
  const { letterId } = useParams();

  useEffect(() => {
    const getLetterById = async () => {
      try {
        if (letterId) {
          const response = await axios.get(`/api/letters/${letterId}`, {
            params: { letterId: letterId },
          });          
          setLetter(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getLetterById();
  }, [letterId]);

  if (!letter) return <Loading />

  return (
    <div className='bg-white rounded-md p-4 w-full shadow-xl'>
      {letter.content}
    </div>
  )
}

export default Letter