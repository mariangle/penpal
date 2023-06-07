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