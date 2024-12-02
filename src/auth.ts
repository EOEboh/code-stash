import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./app/lib/db";
import User from "./app/models/UserSchema";
import { Account } from "./app/models/AccountSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GitHub({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          const existingAccount = await Account.findOne({
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
          });

          if (existingAccount) {
            return true;
          } else {
            throw new Error("OAuth Account Not Linked");
          }
        }
        return true;
      } catch (error) {
        console.error("Sign in error", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});
