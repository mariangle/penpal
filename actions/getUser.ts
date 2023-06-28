import prisma from "@/lib/prismaClient";

const getUser = async (userId: string) => {
  try {

    if (!userId || userId === "favicon.ico") {
      return null;
    }
    
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        receivedReviews: {
          include: {
            author: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.log("Error fetching user:", error);
    return null;
  }
};

export default getUser;