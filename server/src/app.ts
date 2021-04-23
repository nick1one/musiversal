import cors from "cors";
import express, { Application, Request, Response } from "express";
import path from "path";
import { CONFIG, PORT_NUMBER, UI_APP_URL, URL } from "./constants";
import { mergeTrack, prepareMergeData, scanFolder } from "./helpers";
import {
  SoundfileWithMetadata,
  FEATURE_NAME,
  TrackWithMetadata,
} from "./types";
import bodyParser from "body-parser";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const app: Application = express();

const options: cors.CorsOptions = {
  origin: [UI_APP_URL],
};
app.use(cors(options));
app.use(bodyParser.json());
app.use(
  CONFIG.SAMPLE.SERVE_URL,
  express.static(path.resolve(CONFIG.SAMPLE.FOLDER))
);
app.use(
  CONFIG.TRACK.SERVE_URL,
  express.static(path.resolve(CONFIG.TRACK.FOLDER))
);

app.get(CONFIG.SAMPLE.FETCH_URL, async (req: Request, res: Response) => {
  const samples: SoundfileWithMetadata[] = await scanFolder(
    FEATURE_NAME.SAMPLE
  );
  res.json(samples);
});

app.get(CONFIG.TRACK.FETCH_URL, async (req: Request, res: Response) => {
  const tracks: TrackWithMetadata[] = await scanFolder(FEATURE_NAME.TRACK);
  res.json(tracks);
});

app.post(URL.SAVE, async (req: Request, res: Response) => {
  const { currentTrackName, editorBlocks } = req.body;
  const mergeInputData = prepareMergeData(editorBlocks);
  try {
    const newTrackName = await mergeTrack(mergeInputData, currentTrackName);
    console.log(newTrackName);
    res.json({ mergedTrack: newTrackName });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(PORT_NUMBER, function () {
  console.log(`App is listening on port ${PORT_NUMBER} !`);
});
