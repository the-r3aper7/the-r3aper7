import { component$, useStore } from '@builder.io/qwik';
import type { RequestHandler} from '@builder.io/qwik-city';
import { server$ } from '@builder.io/qwik-city';
import type { VideoInfo, ytDlpYouTubeData } from '../../types/yt-dlp-drive';
import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { formatBytes } from '~/utils/unit-conversion';
import {google} from "googleapis";
import { decode } from '@auth/core/jwt';

export const getVideoInfo = server$((url: string) => {
  return new Promise<VideoInfo>((resolve, reject) => {
    const rawData: any[] = []
    const args = ['-j', url]
    const ytDlpProcess = spawn('yt-dlp', args);

    ytDlpProcess.stderr.on('error', () => {
      reject({ name: "", formats: [], success: false });
    })

    ytDlpProcess.on('close', (code) => {
      if (code === 0) {
        // Parse the JSON data
        const ytdlpInfoJSONFormatted = JSON.parse(rawData.toString()) as ytDlpYouTubeData;

        // Extract the video formats from the JSON data
        const formats = ytdlpInfoJSONFormatted.formats.map((format) => ({
          formatId: format.format_id,
          resolution: format.resolution,
          extension: format.ext,
          audioCodec: format.acodec,
          videoCodec: format.vcodec,
          fileSize: formatBytes(format.filesize),
        }));
        // Return the video formats
        resolve({ name: ytdlpInfoJSONFormatted.title, formats: formats, success: true })
      }
      reject({ name: "", formats: [], success: false })
    })

    ytDlpProcess.stdout.on("data", (chunks) => {
      rawData.push(chunks)
    })
  })
},);

export const downloadVideo = server$(
  async (url: string) => {
    try {
      const args = ['-q', '-f', 'bestvideo[ext=webm]+bestaudio[ext=m4a]/best', '-S', 'ext:mp4:m4a', url, '-o', '-'];
      const ytDlpProcess = spawn('yt-dlp', args);
      const buff: any[] = []
      for await (const chunk of ytDlpProcess.stdout) {
        buff.push(chunk)
      }
      writeFileSync("1.mp4", Buffer.concat(buff))
      return 'completed';
    } catch {
      return 'some error occured'
    }
  },
);

export const oauth2Client = new google.auth.OAuth2({
  clientId: import.meta.env.GOOGLE_ID,
  clientSecret: import.meta.env.GOOGLE_SECRET,
  redirectUri: "http://localhost:5173/api/auth/callback/google"
})

export const onRequest: RequestHandler = async ({ json, method, cookie, env }) => {
  // headers.set('Cache-Control', 'private');
  if (method === 'POST' && cookie.has("next-auth.session-token")) {
    const accessToken = await decode({token: cookie.get("next-auth.session-token")?.value, secret: env.get("AUTH_SECRET")!})
    oauth2Client.setCredentials({
      access_token: accessToken?.access_token as string,
    })
    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client
    });
    const files = await drive.files.list();
    files.data.files?.forEach((file) => {
      console.log('Name:', file.name);
      console.log('Type:', file.mimeType);
      console.log('ID:', file.id);
    });
    json(200, { message: 'Hello World' });
  }
};

export default component$(() => {
  const resolutionStore = useStore<VideoInfo>({ name: "", formats: [], success: false });
  return (
    <div class={'flex justify-center items-center min-h-screen flex-col'}>
      <button onClick$={
        async () => {
          const resolutions = await getVideoInfo('https://www.youtube.com/watch?v=r51cYVZWKdY');
          resolutionStore.name = resolutions.name
          resolutionStore.formats = resolutions.formats
          resolutionStore.success = resolutions.success
        }
      }>Get Resolutions</button>
      <a href="/api/yt-dlp-drive/google-auth">Login</a>

      {/* <img src={session.value?.user?.image} /> */}
      {resolutionStore.success ? (
        // When the action is done successfully, the `action.value` property will contain the return value of the action
        <>
          <p class={'text-white'}>Video Title is {resolutionStore.name}</p>
          <table class={'text-white'}>
            <thead>
              <tr>
                <th hidden>Format Id</th>
                <th>Resolution</th>
                <th>Extension</th>
                <th>Audio Codec</th>
                <th>Video Codec</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {resolutionStore.formats &&
                resolutionStore.formats.map((format, index) => {
                  return (
                    <tr key={`get-res-action-table-row-${index}`}>
                      <td hidden>{format.formatId}</td>
                      <td>{format.resolution}</td>
                      <td>{format.extension}</td>
                      <td>{format.audioCodec}</td>
                      <td>{format.videoCodec}</td>
                      <td>{format.fileSize}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : <>Failed</>}
    </div>
  );
});
