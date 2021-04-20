import fs from "fs";
import * as mm from "music-metadata";
import { nanoid } from "nanoid";
import path from "path";
import { promisify } from "util";
import { SAMPLE_FOLDER } from "./constants";
import { SampleWithMetadata } from "./types";

const readdir = promisify(fs.readdir);

const getName = (fullName: string): string => fullName.split(".")[0];

const getMetaData = (
  samples: string[],
  sampleFolder: string
): Promise<SampleWithMetadata[]> =>
  Promise.all(
    samples.map(async (filename) => {
      const filePath = path.join(sampleFolder, filename);
      const outputData = {
        id: nanoid(),
        name: getName(filename),
        path: filePath,
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

export const getSampleList = async () => {
  const sampleFolder = path.resolve(SAMPLE_FOLDER);
  return await getMetaData(await readdir(sampleFolder), sampleFolder);
};
