import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '../../../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        mail: { label: process.env.ADMIN_MAIL, type: 'text' },
        password: { label: process.env.ADMIN_PASS, type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.mail || !credentials?.password) {
        }

        const user = await prisma.usuario.findUnique({
          where: {
            mail: credentials.mail,
          },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: String(user.id),
            name: user.name,
            email: user.mail,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
