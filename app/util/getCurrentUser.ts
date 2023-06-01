import prisma from "@/app/libs/prismadb";

const getCurrentUser = async (email: string) => {
  try {
    if (!email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
