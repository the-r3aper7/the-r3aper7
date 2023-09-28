import { server$ } from '@builder.io/qwik-city';
import qs from 'node:querystring';

export interface TokenValidityType {
  issued_to: string;
  audience: string;
  scope: string;
  expires_in: number;
  access_type: string;
}

export interface AccessTokenType {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

export const isValidToken = server$(async function (accessToken: string) {
  const tokenValidityURL = new URL('https://www.googleapis.com/oauth2/v1/tokeninfo');
  tokenValidityURL.searchParams.set('access_token', accessToken);

  const tokenValidityRequest = await fetch(tokenValidityURL);

  const tokenValidityResponse = (await tokenValidityRequest.json()) as TokenValidityType;

  if (tokenValidityRequest.status === 400) {
    return { isValid: false, expires_in: 0 };
  }

  return { isValid: true, expires_in: tokenValidityResponse.expires_in };
});

export const getNewAccessToken = server$(async function (
  refreshToken: string,
  access_token: string
) {
  const tokenUrl = 'https://oauth2.googleapis.com/token';

  const { isValid, expires_in } = await isValidToken(access_token);

  if (isValid && expires_in > 10) {
    return { accessToken: access_token, isNew: false };
  }

  const values = {
    client_id: process.env.GOOGLE_ID,
    client_secret: process.env.GOOGLE_SECRET,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  const options = {
    method: 'POST',
    body: qs.stringify(values),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const accessTokenRequest = await fetch(tokenUrl, options);
  const accessTokenResponseJSON = (await accessTokenRequest.json()) as AccessTokenType;

  return { accessToken: accessTokenResponseJSON.access_token, isNew: true };
});
