import { server$ } from "@builder.io/qwik-city"
import { log } from "node:console";
import qs from "node:querystring"

export interface GoogleOAuthTokenResponse {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  id_token?: string;
  err?: string;
}

export const getGoogleOAuthToken = server$(async function (code: string) {
  const tokenURL = 'https://oauth2.googleapis.com/token';

  log(this)

  const values = {
    code: code,
    client_id: process.env.GOOGLE_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  const options = {
    method: 'POST',
    body: qs.stringify(values),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  const response = await fetch(tokenURL, options);
  const jsonResponse = await response.json()
  
  if (!(response.status === 200)) {
    return {err: 'some error occurred'} as GoogleOAuthTokenResponse
  }

  return jsonResponse as GoogleOAuthTokenResponse
})