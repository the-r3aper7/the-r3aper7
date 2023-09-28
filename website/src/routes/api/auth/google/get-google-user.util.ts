import { server$ } from '@builder.io/qwik-city';

export interface GoogleUser {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
  err?: string;
}

export const getGoogleUser = server$(async function (access_token: string, id_token: string) {
  const userInfoUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

  const options = {
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  };

  const request = await fetch(userInfoUrl, options);
  const jsonResponse = await request.json();

  if (!(request.status === 200)) {
    return { err: 'some error occured' } as GoogleUser;
  }
  return { ...jsonResponse, err: '' };
});
