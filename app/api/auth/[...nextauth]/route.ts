import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/app/libs/prismadb"
import bcrypt from "bcrypt"


// https://authjs.dev/getting-started/oauth-tutorial

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text"},
        password: { label: "password", type: "password"}
      },
      async authorize(credentials){

        // check to see if email and password is there
        if (!credentials?.email || !credentials?.password){
          throw new Error("Please enter an email and password")
        }

        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          },
        })

        // if no user found
        if (!user || !user.hashedPassword){
          throw new Error("No user found")
        }

        // checking if password matches
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!passwordMatch){
          throw new Error("Incorrect password")
        }

        return user;
      }
    })
  ],
  secret: process.env.SECRET,
  session: {
      strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
} 

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };