import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import prisma from '@/app/libs/prismadb';

export const GET = async (req: NextApiRequest) => {
    const { searchParams } = new URL(req.url as string);
    const email = searchParams.get("email");

    console.log('Received email:', email);

  const currentUser = await prisma.user.findUnique({
    where: { email: email ?? undefined },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      about: true,
      interests: true,
      country: true,
      age: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!currentUser) {
    return new NextResponse('User not found', { status: 404 });
  }

  return new Response(JSON.stringify(currentUser), { status: 200})
};
