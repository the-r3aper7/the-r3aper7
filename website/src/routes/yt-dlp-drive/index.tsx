import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { promisify } from 'util';
import { exec } from 'child_process';
import { ytDlpYouTubeData } from '../../types/yt-dlp-drive';
const execPromise = promisify(exec);

export const useGetResolution = routeAction$(
  async (data, requestEvent) => {
    const { stdout, stderr } = await execPromise(`yt-dlp -j ${data.url}`);

    if (stderr) {
      console.error(`Error: ${stderr}`);
      return null;
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

export default component$(() => {
  const getResAction = useGetResolution();
  return (
    <div class={'flex justify-center items-center min-h-screen flex-col'}>
      <Form action={getResAction} class={'flex flex-col space-y-2'}>
        <input name='url' value={'https://www.youtube.com/watch?v=O94ESaJtHtM'} required />
        <button type='submit' class={'text-white border border-1'}>
          Get Resolution
        </button>
      </Form>
      {getResAction.value?.success && (
        // When the action is done successfully, the `action.value` property will contain the return value of the action
        <p class={'text-white'}>User {getResAction.value.name} added successfully</p>
      )}
      <table class={"text-white"}>
        <thead>
          <tr>
            <th class={'hidden'}>Format Id</th>
            <th>Resolution</th>
            <th>Extension</th>
            <th>Audio Codec</th>
            <th>Video Codec</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {getResAction.value?.formats && getResAction.value?.formats.map((format) => {
            return <tr>
              <td>{format.formatId}</td>
              <td>{format.resolution}</td>
              <td>{format.extension}</td>
              <td>{format.audioCodec}</td>
              <td>{format.videoCodec}</td>
              <td>{format.fileSize}</td>
            </tr>
          })
          }
        </tbody>
      </table>
    </div>
  );
});
