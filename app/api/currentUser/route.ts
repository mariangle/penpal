import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { parseISO } from 'date-fns';
import getCurrentUser from '@/app/actions/getCurrentUser';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url as string);
  const email = searchParams.get("email");

  if (!email) {
    return new NextResponse('Email not found', { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      coverPhoto: true,
      about: true,
      interests: true,
      country: true,
      dob: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      lastLoggedIn: true,
      sentLetters: true,
      receivedLetters: true
    },
  });

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200})
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url as string);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new NextResponse('User not found', { status: 404 });
  }

  await prisma.letter.deleteMany({
    where: { senderId: userId },
  });

  const user = await prisma.user.delete({
    where: { id: userId}
  })

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return new NextResponse('User deleted', { status: 200 });
}