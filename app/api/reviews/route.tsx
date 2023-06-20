import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { title, rating, content, userId, authorId } = await req.json();

  if (!title || !content || !rating) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  if (!authorId) {
    return new NextResponse("Unathorized", { status: 401 });
  }

  try {
    const review = await prisma.review.create({
      data: {
        title,
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
