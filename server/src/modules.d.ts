// src/types/audioconcat/index.d.ts

declare module "audioconcat" {
  export default class AudioConcat {
    constructor(audios: Array<string>);

    VERSION: string;

    ffmpeg: Function;

    concat(images: string[], options: any): this;

    on(event: "start", callback: (command: any) => void): this;
    on(
      event: "error",
      callback: (err: any, stdout: any, stderr: any) => void
    ): this;
    on(event: "end", callback: (output: any) => void): this;
  }
}
