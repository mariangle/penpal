import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import prisma from '@/app/libs/prismadb';


export const GET = async (req: NextApiRequest) => {
  const { searchParams } = new URL(req.url as string);
  const userId = searchParams.get("userId")

  if (!userId) {
    return new NextResponse('User ID not found', { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 })
};
