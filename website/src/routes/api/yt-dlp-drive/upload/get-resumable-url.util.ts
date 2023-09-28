import { server$ } from '@builder.io/qwik-city';

export const getResumableUploadURL = server$(async function (
  accessToken: string,
  fileName: string,
  description?: string
) {
  let body;

  if (!description) {
    body = JSON.stringify({
      name: fileName,
      mimeType: 'video/x-matorska',
    });
  }

  body = JSON.stringify({
    name: fileName,
    description: description,
    mimeType: 'video/x-matorska',
  });

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: body,
  };

  const responseLocation = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
    options
  );

  const location = responseLocation.headers.get('location') as string;

  if (!location) {
    return 'invalid-token';
  }

  return location;
});
