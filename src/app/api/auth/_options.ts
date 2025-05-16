import { NextAuthOptions } from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { generateSecretForAppleAuth } from '~/lib/generateSecretForAppleAuth';

const pkceCodeVerifierCookie: any = {
  name: 'next-auth.pkce.code_verifier',
  options: {
    httpOnly: true,
    sameSite: 'none',
    path: '/',
    secure: true,
  },
};

export async function getAuthOptions(): Promise<NextAuthOptions> {
  const appleClientSecret = await generateSecretForAppleAuth({
    clientId: process.env.APPLE_CLIENT_ID!,
    keyId: process.env.APPLE_KEY_ID!,
    teamId: process.env.APPLE_TEAM_ID!,
    privateKey: process.env.APPLE_PRIVATE_KEY!,
  });
  return {
    pages: {
      signIn: '/en/auth/login',
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      AppleProvider({
        clientId: process.env.APPLE_CLIENT_ID!,
        clientSecret: appleClientSecret,
        authorization: {
          params: {
            response_type: 'code id_token',
            response_mode: 'form_post',
            scope: 'name email',
            client_id: process.env.APPLE_CLIENT_ID!,
          },
        },
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials) {
            return null;
          }

          try {
            const res = await fetch(`${process.env.API_HOST}/token/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
              }),
            });
            console.log(`the api token hit is ${process.env.API_HOST}/token/`);

            const user = await res.json();

            if (res.ok && user) {
              return user; // Return user object to be encoded in JWT
            }
            return null;
          } catch (err) {
            console.error('Failed to parse user JSON', err);
            return null;
          }
        },
      }),
    ],
    cookies: {
      pkceCodeVerifier: pkceCodeVerifierCookie,
    },
    session: {
      strategy: 'jwt', // Use JWT for sessions
    },
    callbacks: {
      async jwt({ token, user, account }) {
        // Add user data to the token on first login
        if (user) {
          token = { ...token, ...user };
        }
        if (account) {
          token = { ...token, ...account };
        }
        if (token?.id_token && token?.provider === 'apple') {
          try {
            const endpoint = `${process.env.API_HOST}/auth/apple/`;
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken: token?.id_token }),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data) {
              token = { ...token, access: data.accessToken };
            }
          } catch (error) {
            console.error(
              'There was a problem with the fetch operation:',
              error
            );
          }
        }
        if (account?.id_token && account?.provider === 'google') {
          try {
            const endpoint = `${process.env.API_HOST}/auth/google/`;
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken: account?.id_token }),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data) {
              token = { ...token, access: data.accessToken };
            }
          } catch (error) {
            console.error(
              'There was a problem with the fetch operation:',
              error
            );
          }
        }
        return token;
      },
      async session({ session, token }) {
        // Pass token data to the session object
        return {
          ...session,
          user: token,
        };
      },
    },
  };
}
