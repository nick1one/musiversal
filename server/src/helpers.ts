import fs from "fs";
import * as mm from "music-metadata";
import { nanoid } from "nanoid";
import path from "path";
import { promisify } from "util";
import {
  API_URL,
  CONFIG,
  DATA_FOLDER,
  DRAFT_FILENAME,
  PORT_NUMBER,
  SILENCE_FILE,
} from "./constants";
import {
  SoundfileWithMetadata,
  FEATURE_NAME,
  SUPPORTED_EXTENSIONS,
} from "./types";
import { safename } from "safename";
import ffmpeg from "fluent-ffmpeg";

const readdir = promisify(fs.readdir);
const getName = (fullName: string): string => fullName.split(".")[0];
const getExtension = (fullName: string): string => fullName.split(".")[1];

const getMetaData = (
  soundFiles: string[],
  folder: string,
  target: FEATURE_NAME
): Promise<SoundfileWithMetadata[]> =>
  Promise.all(
    soundFiles
      .filter((filename) => {
        const isDraftFile = filename === `${DRAFT_FILENAME}.mp3`;
        const isFormatSupported = SUPPORTED_EXTENSIONS.includes(
          getExtension(filename).toLowerCase()
        );
        return !isDraftFile && isFormatSupported;
      })
      .map(async (filename) => {
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

export const scanFolder = async (target: FEATURE_NAME) => {
  const targetFolder = path.resolve(`./${CONFIG[target].FOLDER}`);
  return await getMetaData(await readdir(targetFolder), targetFolder, target);
};

export const mergeTrack = (mp3Arr: string[], newName: string) => {
  const resultFileName = getTrackName(newName);
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input("concat:" + mp3Arr.join("|"))
      .outputOptions("-acodec mp3")
      .on("end", function () {
        resolve(resultFileName);
      })
      .on("error", function (err: Error) {
        reject(err);
      })
      .save(path.join(CONFIG[FEATURE_NAME.TRACK].FOLDER, resultFileName));
  });
};

type MergeInput = string | null;
export const prepareMergeData = (editorBlocks: MergeInput[]): string[] =>
  editorBlocks.map((file: MergeInput) =>
    file
      ? path.join(CONFIG[FEATURE_NAME.SAMPLE].FOLDER, file)
      : path.join(DATA_FOLDER, SILENCE_FILE)
  );

const getTrackName = (newName: string) =>
  newName ? `${safename(newName)}.mp3` : `${nanoid()}.mp3`;
