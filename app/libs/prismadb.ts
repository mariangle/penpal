import { PrismaClient } from "@prisma/client"

// This code sets up a tool called "Prisma Client" that helps interact with the database.
// It ensures that the tool is ready to use before using it.

// Declare a special variable called "prisma" that can hold the Prisma Client tool
declare global {
var prisma: PrismaClient | undefined;
}

// Check if the Prisma Client tool is already set up, otherwise create a new instance of it
const client = globalThis.prisma || new PrismaClient();

// If the code is not running in a production environment, assign the created tool to the global "prisma" variable
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;