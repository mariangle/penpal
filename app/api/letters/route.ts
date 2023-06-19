import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server"

export const POST = async ( 
    req: Request
) => {
    const { title, image, content, senderId, receiverId } = await req.json();

    if (!title || !content || !senderId || !receiverId){
        return new NextResponse("Missing Fields", { status: 400 })
    }

    const letter = await prisma.letter.create({
        data: {
            title,
            image, 
            content,
            senderId,
            receiverId
        }
    })

    return NextResponse.json(letter)
}

export const GET = async (
    req: Request
) => {
    const { searchParams } = new URL(req.url as string);
    const userId =  searchParams.get("userId")

    if (!userId) {
        return new NextResponse("User ID not found", { status: 404 });
    }      

    const letters = await prisma.letter.findMany({
        where: {
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        },
        include: { sender: true },
    })

    return new Response(JSON.stringify(letters), { status: 200})
}   