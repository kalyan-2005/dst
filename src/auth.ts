import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, auth,signIn,signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/signin'
  },
  session:{
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days 
  },
  providers: [
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcryptjs.compare(credentials.password, user.password);

        if (!isValid) {
          return null;
        }

        return user;
      },
    }),
  ],
});