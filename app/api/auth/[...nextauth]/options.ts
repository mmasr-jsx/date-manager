import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "User name...",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        //This is where we need to retrieve user data to verify with credentials
        //here I should get the data
        const user = { id: "42", name: "Maika", password: "1234" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  /* pages: {
        signIn: "/sigin"
    } */
};
