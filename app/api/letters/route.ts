import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server"

export const POST = async ( 
    req: Request
) => {
    const { image, content, senderId, receiverId, arrivalAt } = await req.json();

    if (!content || !senderId || !receiverId || !arrivalAt){
        return new NextResponse("Missing Fields", { status: 400 })
    }

    const letter = await prisma.letter.create({
        data: {
            image, 
            content,
            senderId,
            receiverId,
            arrivalAt
        }
    })

    return NextResponse.json(letter, { status: 200 })
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