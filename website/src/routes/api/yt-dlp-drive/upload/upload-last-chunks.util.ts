import { server$ } from '@builder.io/qwik-city';

export const uploadLastChunks = server$(async function (
  resumableLocation: string,
  previous: number,
  chunkArray: Buffer[]
) {
  let totalSize = previous;
  const combinedChunk = Buffer.concat(chunkArray);
  totalSize += combinedChunk.length;

  const optionsUploadChunks = {
    method: 'PUT',
    headers: {
      'Content-Length': `${combinedChunk.length}`,
      'Content-Range': `bytes ${previous}-${previous + combinedChunk.length - 1}/${totalSize}`,
      'Content-Type': 'video/x-matorska',
    },
    body: combinedChunk,
  };
  const uploadResponse = await fetch(resumableLocation, optionsUploadChunks);
  if (uploadResponse.status === 200 || uploadResponse.status === 201) {
    return 'completed';
  }
  return 'incomplete';
});
