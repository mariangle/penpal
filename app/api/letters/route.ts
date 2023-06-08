import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server"


export const POST = async ( 
    req: Request
) => {
    const { title, image, content, senderId, receiverId } = await req.json();

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


    const letters = await prisma.letter.findMany({
        where: { receiverId: userId ?? undefined},
        include: { sender: true },
    })

    return new Response(JSON.stringify(letters), { status: 200})
}   