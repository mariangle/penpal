"use client"

import Loading from '@/app/components/Loading';
import Letter from '../components/Letter';

import { ILetter } from '@/app/types/Letter';
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import axios from 'axios';

const LetterPage = () => {
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
      <Letter letter={letter}></Letter>
    </div>
  )
}

export default LetterPage