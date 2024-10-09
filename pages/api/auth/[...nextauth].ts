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
        // Replace this with actual authentication logic
        const users = [
          {
            id: '1', // Ensure this is a string
            name: 'Admin',
            username: 'admin',
            password: 'admin', // Use hashed passwords in production
            role: 'admin',
          },
        ];

        // Find user matching the provided credentials
        const user = users.find(
          (user) => user.username === credentials?.username && user.password === credentials?.password
        );

        // If user is found, return user object, otherwise return null
        if (user) {
          return {
            id: user.id,        // Ensure id is a string
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
        session.user.id = token.sub;
        session.user.role = token.role;  // Attach role to session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',  // Redirect users to a custom login page
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,  // Ensure you have a valid secret in your .env file
});
