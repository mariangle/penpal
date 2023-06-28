import prisma from '@/lib/prismaClient';
import { NextResponse } from "next/server"
import getCurrentUser from '@/actions/getCurrentUser';

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

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return new NextResponse("Unauthorized", { status: 401 });
    }      

    const letters = await prisma.letter.findMany({
        where: {
          OR: [
            { senderId: currentUser.id },
            { receiverId: currentUser.id }
          ]
        },
        include: { sender: true },
    })

    return new Response(JSON.stringify(letters), { status: 200})
}   