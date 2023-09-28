import { server$ } from '@builder.io/qwik-city';

export const uploadChunk = server$(async function (
  location: string,
  chunk: Buffer,
  previous: number
) {
  const optionsUploadChunks = {
    method: 'PUT',
    headers: {
      'Content-Length': `${chunk.length}`,
      'Content-Range': `bytes ${previous}-${previous + chunk.length - 1}/*`,
      'Content-Type': 'video/x-matorska',
    },
    body: chunk,
  };

  const uploadResponse = await fetch(location, optionsUploadChunks);

  if (uploadResponse.status === 308) {
    return 'continue';
  }

  return 'error';
});
