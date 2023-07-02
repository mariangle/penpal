import prisma from '@/lib/prismadb';
import { NextResponse } from "next/server"
import getCurrentUser from '@/actions/getCurrentUser';
import { calculateLetterArrival } from '@/actions/getArrival';

export const POST = async ( 
    req: Request
) => {
    const user = await getCurrentUser();
    const { content, email } = await req.json();

    if (!user){
        return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!content || !email ){
        return new NextResponse("Missing Fields", { status: 400 })
    }

    const receiver = await prisma.user.findFirst({
        where: { email: email }
    })

    if (!receiver){
        return new NextResponse("Not Found", { status: 404 })
    }

    const arrival = await calculateLetterArrival(user.country, receiver.country);

    const letter = await prisma.letter.create({
        data: {
            content,
            senderId: user.id,
            receiverId: receiver.id,
            arrivalAt: arrival.arrivalDate
        }
    })
    
    return NextResponse.json({ letter, deliveryDays: arrival.deliveryDays}, { status: 200 });
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