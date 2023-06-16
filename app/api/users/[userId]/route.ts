import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { parseISO } from 'date-fns';


export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url as string);
  const userId = searchParams.get("userId")

  if (!userId) {
    return new NextResponse('User ID not found', { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      image: true,
      about: true,
      interests: true,
      country: true,
      dob: true,
      isVerified: true,
      createdAt: true,
      lastLoggedIn: true,
    },
  });

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 })
};

export const PUT = async (req: NextRequest) => {
  const { name, image, about, country, dob, userId } = await req.json();
  
  if (!name || !country || !dob) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        image,
        about,
        country,
        dob: parseISO(dob),
        updatedAt: new Date(),
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
