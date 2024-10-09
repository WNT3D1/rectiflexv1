import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Replace this with actual authentication logic
        const users = [
          { id: 1, name: 'Admin', username: 'admin', password: 'admin', role: 'admin' },
          { id: 2, name: 'Supervisor', username: 'supervisor', password: 'supervisor', role: 'supervisor' },
          { id: 3, name: 'Subcontractor', username: 'subcontractor', password: 'subcontractor', role: 'subcontractor' }
        ];

        const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,  // Add this line to include the secret
});
