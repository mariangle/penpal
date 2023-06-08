"use client"

import { useLetter } from "@/app/util/useLetter";
import Loading from "@/app/components/common/Loading";

const Letters = () => {
  const { letters, loading } = useLetter();

  if (loading) return <Loading />
  
  return (
    <div>
      <h1>Your letters</h1>
      {letters?.length === 0 ? (
        <p>You haven't received any letters.</p> // Show a message if there are no letters
      ) : (
        letters?.map((letter) => (
          <div key={letter.id}>
            <h2>{letter.title}</h2>
            <p>{letter.content}</p>
          </div>
        ))
      )}
    </div>
  );
};


export default Letters;
