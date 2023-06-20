import prisma from '@/app/libs/prismadb';

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        id: true,
        image: true,
        coverPhoto: true,
        country: true,
        dob: true,
        isVerified: true
      }
    });
    
    return new Response(JSON.stringify(users), { status: 200})
  } catch (err) {
    console.log("Error fetching users:", err)
  }
};
