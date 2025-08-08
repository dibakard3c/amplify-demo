import NextAuth, { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";


export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: '',
      issuer: `https://cognito-idp.eu-west-1.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
      client: { token_endpoint_auth_method: "none" }, // important
      checks: ["pkce", "state"],
      authorization: { params: { scope: "openid email profile" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('ddd')
      session.accessToken = token.accessToken as string;
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`; // send user to dashboard after login
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
