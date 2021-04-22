import fs from "fs";
import * as mm from "music-metadata";
import { nanoid } from "nanoid";
import path from "path";
import { promisify } from "util";
import { API_URL, CONFIG, PORT_NUMBER } from "./constants";
import { SoundfileWithMetadata, SoundType } from "./types";

const readdir = promisify(fs.readdir);
const getName = (fullName: string): string => fullName.split(".")[0];

const getMetaData = (
  soundFiles: string[],
  folder: string,
  target: SoundType
): Promise<SoundfileWithMetadata[]> =>
  Promise.all(
    soundFiles.map(async (filename) => {
      const filePath = path.join(folder, filename);
      const outputData = {
        id: nanoid(),
        name: getName(filename),
        path: `${API_URL}:${PORT_NUMBER}${CONFIG[target].SERVE_URL}/${filename}`,
      };
      try {
        const {
          format: { duration },
        } = await mm.parseFile(filePath);
        return {
          ...outputData,
          duration: duration ? Math.round(duration) : 0,
        };
      } catch (error) {
        console.error(error.message);
        return { ...outputData, duration: 0 };
      }
    })
  );

export const scanFolder = async (target: SoundType) => {
  const targetFolder = path.resolve(`./${CONFIG[target].FOLDER}`);
  return await getMetaData(await readdir(targetFolder), targetFolder, target);
};
