import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const users = [
          {
            id: '1',  // Make sure this is a string
            name: 'Admin',
            username: 'admin',
            password: 'admin',  // Use hashed passwords in production
            role: 'admin',
          },
        ];

        const user = users.find(
          (user) =>
            user.username === credentials?.username &&
            user.password === credentials?.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;  // Assign token id to session.user.id
        session.user.role = token.role;  // Attach role to session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  // Assign user id to JWT token
        token.role = user.role;  // Attach user role to JWT token
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',  // Custom login page
  },
  session: {
    strategy: 'jwt',  // Use JWT for session handling
  },
  secret: process.env.NEXTAUTH_SECRET,  // Set your secret in .env
});
