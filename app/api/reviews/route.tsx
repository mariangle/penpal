import prisma from '@/lib/prismadb';
import { NextResponse } from "next/server";
import getCurrentUser from '@/actions/getCurrentUser';

export const POST = async (req: Request) => {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }  
  
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
        author: true,
      }
    });

    return new Response(JSON.stringify(reviews), { status: 200})

  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export const DELETE = async (req: Request) => {
  const { searchParams } = new URL(req.url as string);
  const reviewId =  searchParams.get("reviewId")

  if (!reviewId) {
    return new NextResponse("Review ID not found", { status: 404 });
  }

  try {
    const review = await prisma.review.delete({
      where: {
        id: reviewId
      }
    })
  
    return new Response(JSON.stringify(review), { status: 200})

  } catch (error) {
    console.log(error)
  }
}