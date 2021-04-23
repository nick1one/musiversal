export const HEADER_TEXT = "My Studio";
export const SAMPLES_TITLE = "Samples";
export const SAVE_BUTTON_CAPTION = "Save";
export const DEFAULT_TRACK_NAME = "Track Name";
export const TRACKS_TITLE = "Saved Tracks";
export const NO_TRACKS_MESSAGE = "You didn’t save any tracks, yet.";

export const EDITOR_LENGTH_SEC = 90;
export const EDITOR_BLOCKS_NUM = 30;

export const API_URL = {
  BASE: "http://localhost:3001",
  SAVE_TRACK: "/save-track",
};

export enum FEATURE_NAMES {
  EDITOR = "editor",
  SAMPLE_LIST = "sampleList",
  TRACK_LIST = "trackList",
}

export const FEATURE = {
  [FEATURE_NAMES.EDITOR]: {
    FETCH_DATA_URL: "/get-current-track",
  },
  [FEATURE_NAMES.SAMPLE_LIST]: {
    FETCH_DATA_URL: "/sample-list",
  },
  [FEATURE_NAMES.TRACK_LIST]: {
    FETCH_DATA_URL: "/track-list",
  },
};

export const EDITOR_HOVER_COLOR = "blanchedalmond";
export const EDITOR_SAMPLE_COLORS = [
  "#44837D",
  "#E2AC4B",
  "#2271b1",
  "#646970",
  "#d63638",
  "#996b00",
  "#008a20",
  "#e75f51",
  "#20639b",
  "#689e7c",
];
