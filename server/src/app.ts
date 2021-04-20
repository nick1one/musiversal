import cors from "cors";
import express, { Application, Request, Response } from "express";
import { SampleWithMetadata } from "./types";
import { LOCALHOST_BASEURL, PORT_NUMBER, URL } from "./constants";
import { getSampleList } from "./helpers";

const app: Application = express();

const options: cors.CorsOptions = {
  origin: [LOCALHOST_BASEURL],
};
app.use(cors(options));
app.get(URL.SAMPLES, async (req: Request, res: Response) => {
  const samples: SampleWithMetadata[] = await getSampleList();
  res.json({ samples });
  // console.log(util.inspect(samples, { showHidden: false, depth: null }));
});

app.post(URL.SAVE, async (req: Request, res: Response) => {});

app.listen(PORT_NUMBER, function () {
  console.log(`App is listening on port ${PORT_NUMBER} !`);
});
