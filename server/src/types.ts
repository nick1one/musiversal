export interface SoundfileWithMetadata {
  id: string;
  name: string;
  path: string;
  duration: number;
}

export enum SoundType {
  TRACK = "TRACK",
  SAMPLE = "SAMPLE",
}
