import { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { getServerSession } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prismadb"
import bcrypt from "bcrypt"

// https://authjs.dev/getting-started/oauth-tutorial

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
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
  
          // update lastLoggedIn
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoggedIn: new Date() },
          });
  
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
          });
  
          return dbUser;
        }
      })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: true,
  }   

export const getSession = async () =>  {
  return await getServerSession(authOptions);
}