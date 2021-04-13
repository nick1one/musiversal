import cors from "cors";
import express, { Application, Request, Response } from "express";
import fs from "fs";

const app: Application = express();

const port = 3001;
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.get("/samples", (req: Request, res: Response) => {
  const testFolder = "./data/samples";

  fs.readdir(testFolder, (err, files) => {
    res.json({ samples: files });
  });
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
