import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

// https://authjs.dev/getting-started/oauth-tutorial

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
} 

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };