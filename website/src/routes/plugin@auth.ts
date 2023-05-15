import { serverAuth$ } from '@builder.io/qwik-auth';
import Google from '@auth/core/providers/google';
import type { Provider } from '@auth/core/providers';

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } = serverAuth$(
  ({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    providers: [
      Google({
        clientId: env.get("GOOGLE_ID")!,
        clientSecret: env.get("GOOGLE_SECRET")!,
        authorization: { params: { scope: "email profile https://www.googleapis.com/auth/drive.metadata.readonly" } },
      })
    ] as Provider[],
    callbacks: {
      jwt: ({ token, account }) => {
        if (account?.access_token) {
          token.access_token = account.access_token;
        }
        return token;
      }
    },
  })
);
