import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const users = await prisma.user.findMany();
    console.log(users)
    return new Response(JSON.stringify(users), { status: 200})
  };
