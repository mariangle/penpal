import prisma from "@/app/libs/prismadb";

const getReviews = async (userId: string) => {
    try {

        if (!userId || userId === "favicon.ico") {
            return null;
        }
      
        
        const reviews = await prisma.review.findMany({
            where: {
              userId: userId
            },
            include: {
              replies: {
                include: {
                  author: true
                }
              },
              author: true
            }
        });

        return reviews;

    } catch (error) {
        console.log(error)
        return null;
    }
}

export default getReviews;