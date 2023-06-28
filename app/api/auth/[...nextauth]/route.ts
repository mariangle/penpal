import NextAuth from "next-auth"
import { authOptions } from "@/lib/session";

// https://authjs.dev/getting-started/oauth-tutorial

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };