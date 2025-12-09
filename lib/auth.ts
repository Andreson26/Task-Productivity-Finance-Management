import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/security";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  }, 

  providers: [
    /**
     * 🧩 Credentials Provider
     * Basic login: Email + Password
     * No lockout, no captcha (those will come in future branches)
     */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
             throw new Error("MissingCredentials");
        }

        const email = credentials.email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash) return null;

        const isValid = await verifyPassword(
          credentials.password,
          user.passwordHash
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    /**
     * 🔐 JWT Callback
     * Add id, role, name to token
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name ?? null;
        token.role = (user.role as Role) ?? Role.USER;
      }
      return token;
    },

    /**
     * 🔐 Session Callback
     * Add id, role, name to session.user
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = (token.name as string) ?? null;
        session.user.role = (token.role as Role) ?? Role.USER;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
