import { SoundType } from "./types";

export const DATA_FOLDER = "data/";

export const PORT_NUMBER = 3001;
export const UI_APP_URL = "http://localhost:3000";
export const API_URL = "http://localhost";

export const URL = {
  SAVE: "/save-track",
};

export const CONFIG = {
  [SoundType.SAMPLE]: {
    FETCH_URL: "/sample-list",
    SERVE_URL: "/samples",
    FOLDER: `${DATA_FOLDER}samples`,
  },
  [SoundType.TRACK]: {
    FETCH_URL: "/track-list",
    SERVE_URL: "/tracks",
    FOLDER: `${DATA_FOLDER}tracks`,
  },
};
