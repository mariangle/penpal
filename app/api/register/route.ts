import bcrypt from "bcrypt"
import prisma from "../../libs/prismadb"
import { NextResponse } from "next/server"
import { parseISO } from 'date-fns'
import { getAge } from "@/app/actions/userActions"

export async function POST(
    req: Request
){
    const { name, email, password, dob, country } = await req.json();
    
    if (!name || !email || !password || !dob || !country ){
        return new NextResponse("Missing Fields", { status: 400 })
    }

    if (getAge(dob) < 13) {
        return new NextResponse("You must be at least 13 years old.", { status: 403 });
      }

    const exists = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (exists){
        return new NextResponse("Email exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
            dob: parseISO(dob),
            country,
        }
    })

    return NextResponse.json(user);
}