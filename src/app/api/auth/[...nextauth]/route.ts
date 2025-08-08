import NextAuth, { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";


export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET || "",
      issuer: `https://cognito-idp.eu-west-1.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
      client: { token_endpoint_auth_method: process.env.COGNITO_CLIENT_SECRET ? "client_secret_basic" : "none" },
      checks: ["pkce", "state"],
      authorization: { params: { scope: "openid email profile" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.user = token.user;
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`; // send user to dashboard after login
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
