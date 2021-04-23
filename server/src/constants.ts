import { FEATURE_NAME } from "./types";

export const DATA_FOLDER = "data/";

export const PORT_NUMBER = 3001;
export const UI_APP_URL = "http://localhost:3000";
export const API_URL = "http://localhost";
export const SILENCE_FILE = "empty.mp3";

export const URL = {
  SAVE: "/save-track",
};

export const CONFIG = {
  [FEATURE_NAME.SAMPLE]: {
    FETCH_URL: "/sample-list",
    SERVE_URL: "/samples",
    FOLDER: `${DATA_FOLDER}samples`,
  },
  [FEATURE_NAME.TRACK]: {
    FETCH_URL: "/track-list",
    SERVE_URL: "/tracks",
    FOLDER: `${DATA_FOLDER}tracks`,
  },
};
