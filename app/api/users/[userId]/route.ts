import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { parseISO } from 'date-fns';
import getCurrentUser from '@/app/actions/getCurrentUser';


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
      coverPhoto: true,
      about: true,
      interests: true,
      country: true,
      dob: true,
      isVerified: true,
      createdAt: true,
      lastLoggedIn: true,
      receivedReviews: true,
    },
  });

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 })
};

export const PUT = async (req: NextRequest) => {
  const currentUser = await getCurrentUser();
  const { name, image, coverPhoto, about, dob } = await req.json();

  if (!currentUser){
    return new NextResponse('Unauthorized', { status: 401 });
  }
  
  if (!name || !dob) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  const isVerified = coverPhoto && image && about ? true : false;

  try {
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        image,
        coverPhoto,
        about,
        dob: parseISO(dob),
        updatedAt: new Date(),
        isVerified
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const currentUser = await getCurrentUser();

  if (!currentUser){
    return new NextResponse('Unauthorized', { status: 401 });
  }

  await prisma.letter.deleteMany({
    where: { senderId: currentUser.id },
  });

  const user = await prisma.user.delete({
    where: { id: currentUser.id}
  })

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return new NextResponse('User deleted', { status: 200 });
}