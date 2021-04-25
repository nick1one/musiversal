export interface SoundfileWithMetadata {
  id: string;
  name: string;
  path: string;
  duration: number;
}

export type TrackWithMetadata = SoundfileWithMetadata;

export enum FEATURE_NAME {
  TRACK = "TRACK",
  SAMPLE = "SAMPLE",
}

export const SUPPORTED_EXTENSIONS = ["mp3", "wav"];
