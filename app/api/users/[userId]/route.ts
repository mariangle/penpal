import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import prisma from '@/app/libs/prismadb';


export const GET = async (req: NextApiRequest) => {
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
      age: true,
      isVerified: true,
      createdAt: true,
    },
  });

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 })
};

export const PUT = async (req: NextRequest) => {
  const { name, image, about, country, age, userId } = await req.json();
  
  if (!name || !about || !country || !age) {
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
        age,
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
