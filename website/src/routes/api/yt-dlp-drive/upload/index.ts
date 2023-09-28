import type { RequestHandler } from '@builder.io/qwik-city';
import type { JWTPayload} from '../../auth/google/sign-verify-jwt.util';
import { spawn } from 'node:child_process';
import { uploadChunk } from './upload-chunk.util';
import { uploadLastChunks } from './upload-last-chunks.util';
import { getResumableUploadURL } from './get-resumable-url.util';
import { signJWT, verifyJWT } from '../../auth/google/sign-verify-jwt.util';
import { getNewAccessToken } from '../../auth/google/validity-token.util';

export const onPost: RequestHandler = async ({ headers, json, redirect, request }) => {
  const authorizationHeaders = request.headers.get('Authorization');

  if (!authorizationHeaders) {
    throw redirect(304, '/');
  }

  const authorization = authorizationHeaders?.split(' ');

  const jwtPayload = await verifyJWT(authorization[1]!);

  if (jwtPayload === 'token-malformed') {

    throw redirect(302, '/');
  }

  const { accessToken, isNew } = await getNewAccessToken(
    jwtPayload.refresh_token,
    jwtPayload.access_token
  );

  if (isNew) {
    const payloadJWT: JWTPayload = {
      access_token: accessToken,
      refresh_token: jwtPayload.refresh_token,
      email: jwtPayload.email,
      name: jwtPayload.name,
      image: jwtPayload.image,
    };

    const newBearerToken = await signJWT(payloadJWT);
    headers.set('auth_cookie', newBearerToken);
    throw redirect(307, `${request.url}`);
  }

  const resumableLocation = await getResumableUploadURL(jwtPayload.access_token, 'test.mkv');

  let previous = 0;

  const args = [
    '-q',
    '-f',
    'bestvideo[ext=webm]+bestaudio[ext=webm]/best',
    '--merge-output-format',
    'mkv',
    'https://www.youtube.com/watch?v=53me-ICi_f8',
    '-o',
    '-',
  ];

  const ytDlpProcess = spawn('yt-dlp', args, { stdio: ['pipe'] });
  const CHUNKSIZE256KB = 256 * 1024; // 256KB = 262144

  const chunkArray: Buffer[] = [];

  for await (const chunk of ytDlpProcess.stdout) {
    chunkArray.push(Buffer.from(chunk));

    const combinedChunk = Buffer.concat(chunkArray);

    if (combinedChunk.length >= CHUNKSIZE256KB) {
      const exact256KBChunk = combinedChunk.subarray(0, CHUNKSIZE256KB);
      const remainingChunk = combinedChunk.subarray(CHUNKSIZE256KB, combinedChunk.length);

      await uploadChunk(resumableLocation, exact256KBChunk, previous);

      previous += CHUNKSIZE256KB;

      chunkArray.length = 0;
      chunkArray.push(remainingChunk);
    }
  }

  // uploading remaing chunks
  const response = await uploadLastChunks(resumableLocation, previous, chunkArray);

  if (response !== 'completed') {
    json(200, { message: 'upload incomplete some occured' });
  }

  json(200, { message: 'upload completed' });
};
