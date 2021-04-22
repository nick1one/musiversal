import cors from "cors";
import express, { Application, Request, Response } from "express";
import path from "path";
import { CONFIG, PORT_NUMBER, UI_APP_URL, URL } from "./constants";
import { scanFolder } from "./helpers";
import { SoundfileWithMetadata, SoundType } from "./types";

const app: Application = express();

const options: cors.CorsOptions = {
  origin: [UI_APP_URL],
};
app.use(cors(options));
app.use(
  CONFIG.SAMPLE.SERVE_URL,
  express.static(path.resolve(CONFIG.SAMPLE.FOLDER))
);
app.use(
  CONFIG.TRACK.SERVE_URL,
  express.static(path.resolve(CONFIG.TRACK.FOLDER))
);

app.get(CONFIG.SAMPLE.FETCH_URL, async (req: Request, res: Response) => {
  const samples: SoundfileWithMetadata[] = await scanFolder(SoundType.SAMPLE);
  res.json({ samples });
  // console.log(util.inspect(samples, { showHidden: false, depth: null }));
});

app.get(CONFIG.TRACK.FETCH_URL, async (req: Request, res: Response) => {
  res.json({ tracks: await scanFolder(SoundType.TRACK) });
});

app.post(URL.SAVE, async (req: Request, res: Response) => {});

app.listen(PORT_NUMBER, function () {
  console.log(`App is listening on port ${PORT_NUMBER} !`);
});
