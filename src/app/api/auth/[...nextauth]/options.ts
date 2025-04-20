import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Since we're signing In the user, we need to check the passowrd
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

// id and name of credentials is not that important

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        // Connect to the database
        await dbConnect();

        try {
          // Check if the user exists in our database

          // In sign-in page we'll have 2 fields, "Email/username" and "Password". In "Email/username" field, user can enter either of these. So we need customized query.
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          // If the user doesn't exists
          if (!user) {
            throw new Error("No user found with this Email/Username!");
          }

          // If the user exists but he haven't verified yet.
          if (!user.isVerified) {
            throw new Error("Please verify your account before logging in!");
          }

          // Now compare the password received from user(While Sigin) with the password stored in our database corresponding to that user
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password!");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    // Token by default holds the id of the user, if we need to add more info into the token, we can do that
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }

      return token;
    },
    // Session by default holds the id of the user, if we need to add more info into the session, we can do that
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }

      return session;
    },
  },
  pages: {
    // So that you don't have to create a seperate UI for signin
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "dark",
  },
};