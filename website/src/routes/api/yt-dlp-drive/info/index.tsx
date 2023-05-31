import type { RequestHandler } from '@builder.io/qwik-city';
import { spawn } from 'child_process';
import type { VideoInfo, ytDlpYouTubeData } from '~/types/yt-dlp-drive';
import { formatBytes } from '~/utils/unit-conversion';

export const getVideoInfo = (url: string) => {
  return new Promise<VideoInfo>((resolve, reject) => {
    let rawData = ""
    const args = ['-j', url];
    const ytDlpProcess = spawn('yt-dlp', args, { stdio: ['pipe'] });

    ytDlpProcess.stderr.on('error', () => {
      reject({ name: '', formats: [], success: false });
    });

    ytDlpProcess.stdout.on('data', (chunks: string) => {
      rawData += chunks;
    });

    ytDlpProcess.on('close', (code) => {
      if (code === 0) {
        // Parse the JSON data
        try {
          const ytdlpInfoJSONFormatted = JSON.parse(rawData) as ytDlpYouTubeData;
          // Extract the video formats from the JSON data
          const formats = ytdlpInfoJSONFormatted.formats.map((format) => ({
            formatId: format.format_id,
            resolution: format.resolution,
            extension: format.ext,
            audioCodec: format.acodec,
            videoCodec: format.vcodec,
            fileSize: format.filesize_approx!,
            fileSizeApprox: formatBytes(format.filesize_approx),
          }));
          // Return the video formats
          resolve({ name: ytdlpInfoJSONFormatted.title, formats: formats, success: true });
        } catch {
          resolve({ name: '', formats: [], success: false })
        }
      }
      reject({ name: '', formats: [], success: false });
    });
  });
};

export const onGet: RequestHandler = async ({ json, query }) => {
  const url = query.get('url') as string

  if (!url) {
    json(400, { name: '', formats: [], success: false });
  }

  const response = await getVideoInfo("https://www.youtube.com/watch?v=8zr741ePUCw");

  if (!response.success) {
    json(500, response);
  }

  json(200, response);
};
