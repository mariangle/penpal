'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'

import Button from './common/Button'

interface CloseModalProps {}

const CloseModal: FC<CloseModalProps> = ({}) => {
  const router = useRouter()

  return (
    <Button className='h-6 w-6 p-0 rounded-md bg-black text-white' onClick={() => router.back()}>
      X
    </Button>
  )
}

export default CloseModal