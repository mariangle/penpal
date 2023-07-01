import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url as string);
  const email = searchParams.get("email")

  if (!email) {
    return new NextResponse("Email is required", { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      name: true,
      country: true,
      email: true,
    },
  });

  if (!user) {
    return new NextResponse("Email not found", { status: 404 });
  }
  

  return new Response(JSON.stringify(user), { status: 200 })
};
