import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const GET = async (    
  req: Request,
  { params }: { params: { letterId: string }}
) => {

  if (!params.letterId) {
    return new NextResponse('Letter ID not found', { status: 404 });
  }

  const letter = await prisma.letter.findUnique({
    where: { id: params.letterId },
    include: { sender: true },
    });

  if (!letter) {    
    return new NextResponse('Letter not found', { status: 404 });
  }

  return new Response(JSON.stringify(letter), { status: 200 })
};
