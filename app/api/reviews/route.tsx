import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { rating, content, userId, authorId } = await req.json();

  if (!content || !rating) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  if (!authorId) {
    return new NextResponse("Unathorized", { status: 401 });
  }

  try {
    const review = await prisma.review.create({
      data: {
        content,
        rating,
        authorId,
        userId,
      },
    });

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url as string);
  const userId =  searchParams.get("userId")

  if (!userId){
    return new NextResponse("User ID not found", { status: 404 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: userId
      },
      include: {
        author: true
      }
    });

    return new Response(JSON.stringify(reviews), { status: 200})

  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

