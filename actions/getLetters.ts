import getCurrentUser from "./getCurrentUser"
import prisma from "@/lib/prismadb";

const getLetters = async (type: string) => {
    try {

        const user = await getCurrentUser();

        if (!user) return [];

        if (type === "Inbox"){
            const letters = await prisma.letter.findMany({
                where: {
                    receiverId: user.id
                },
                include: {
                    sender: true
                }
            })

            return letters;

        }

        else if ( type === "Sent"){

        }

        else if (type === "Pending"){

        }

    } catch (error ) {
        return null;
    }
}

export default getLetters;