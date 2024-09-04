import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages:{
    signIn: '/signin'
  },
  providers: [
    Google,
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email: (email as string).toLowerCase(),
          },
        });
        console.log(user);

        if (!user) {
          throw new Error("No user found");
        }

        if (!user.password) {
          throw new Error("User has not set a password");
        }

        const valid = await bcryptjs.compare(password as string, user.password);

        if (!valid) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
});
