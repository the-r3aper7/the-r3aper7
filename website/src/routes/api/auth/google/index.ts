import type { RequestHandler } from '@builder.io/qwik-city';
import type { JWTPayload} from './sign-verify-jwt.util';
import type { GoogleUser} from './get-google-user.util';
import { getGoogleOAuthToken } from './get-google-auth-token.util';
import { getGoogleUser } from './get-google-user.util';
import { signJWT } from './sign-verify-jwt.util';

export const onGet: RequestHandler = async ({ query, send, cookie, redirect }) => {
  const code = query.get('code')!;

  if (!code) {
    send(400, 'no code found in url params');
  }
  
  const { id_token, access_token, refresh_token } = await getGoogleOAuthToken(code);

  const googleUser: GoogleUser = await getGoogleUser(access_token!, id_token!);

  const payloadJWT: JWTPayload = {
    access_token: access_token!,
    refresh_token: refresh_token!,
    email: googleUser.email,
    name: googleUser.name,
    image: googleUser.picture,
  };

  const authCookie = await signJWT(payloadJWT);

  cookie.set('auth_cookie', authCookie!, {
    sameSite: true,
    secure: true,
    path: '/',
    maxAge: [26, 'weeks'],
  });

  throw redirect(302, '/');
};
