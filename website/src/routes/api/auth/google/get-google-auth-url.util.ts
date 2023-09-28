import { server$ } from '@builder.io/qwik-city';
import { URLSearchParams } from 'url';

export const getLoginURL = server$(function () {
  const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    client_id: process.env.GOOGLE_ID!,
    redirect_uri: process.env.REDIRECT_URI!,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/drive',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);

  return `${baseURL}?${qs.toString()}`;
});
