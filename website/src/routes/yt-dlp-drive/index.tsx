import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { promisify } from 'util';
import { exec } from 'node:child_process';
import type { ytDlpYouTubeData } from '../../types/yt-dlp-drive';
import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const execPromise = promisify(exec);

export const useGetVideoInfo = routeAction$(
  async (data) => {
    const { stdout, stderr } = await execPromise(`yt-dlp -j ${data.url}`);

    if (stderr) {
      return { name: [], formats: [], success: false };
    }
    // Parse the JSON data
    const json = JSON.parse(stdout) as ytDlpYouTubeData;

    // Extract the video formats from the JSON data
    const formats = json.formats.map((format) => ({
      formatId: format.format_id,
      resolution: format.resolution,
      extension: format.ext,
      audioCodec: format.acodec,
      videoCodec: format.vcodec,
      fileSize: format.filesize,
    }));
    // Return the video formats
    return { name: json.title, formats: formats, success: true };
  },
  zod$({
    url: z.string(),
  })
);

export const useDownloadVideo = routeAction$(
  async (data) => {
    const args = ['-q', '-f', 'bestvideo[ext=webm]+bestaudio[ext=m4a]/best', '-S', 'ext:mp4:m4a', data.url, '-o', '-'];
    const ytDlpProcess = spawn('yt-dlp', args);
    const buff: any[] = []
    for await (const chunk of ytDlpProcess.stdout) {
      buff.push(chunk)
    }
    writeFileSync("1.mp4", Buffer.concat(buff))
    return 'completed';
  },
  zod$({
    url: z.string(),
  })
);

export default component$(() => {
  const getResAction = useGetVideoInfo();
  const downloadVideo = useDownloadVideo();
  return (
    <div class={'flex justify-center items-center min-h-screen flex-col'}>
      <Form action={getResAction} class={'flex flex-col space-y-2'}>
        <input name='url' value={'https://www.youtube.com/watch?v=jNQXAC9IVRw'} required />
        <button type='submit' class={'text-white border border-1'}>
          Get Resolution
        </button>
      </Form>
      <Form action={downloadVideo} class={'flex flex-col space-y-2'}>
        <input name='url' value={'https://www.youtube.com/watch?v=wBmWHU7KJvQ'} required />
        <button type='submit' class={'text-white border border-1'}>
          Download
        </button>
      </Form>
      {getResAction.value?.success && (
        // When the action is done successfully, the `action.value` property will contain the return value of the action
        <>
          <p class={'text-white'}>Video Title is {getResAction.value.name}</p>
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
              {getResAction.value?.formats &&
                getResAction.value?.formats.map((format, index) => {
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
      )}
    </div>
  );
});
