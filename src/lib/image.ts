import imageSize from 'image-size';
import { readFile } from 'node:fs/promises';

export async function getLocalImageDimensions(path: string) {
  try {
    const imageBuffer = await readFile(path);
    return imageSize(imageBuffer);
  } catch (error) {
    console.error(error, (error as Error)?.stack);
    return null;
  }
}
