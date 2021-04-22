import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { FEATURE_NAMES } from "../constants";
import { fetchFeatureData } from "../helpers";
import { SampleListItem } from "./sampleListSlice";
import { RootState } from "./store";

export interface TrackListItem extends SampleListItem {
  isDraft: boolean;
}

interface TracksState {
  tracks: TrackListItem[];
  isLoading: boolean;
}

const initialState: TracksState = {
  tracks: [],
  isLoading: false,
};

export const fetchAllTracks = createAsyncThunk<TrackListItem[]>(
  "fetchAllTracks",
  async () =>
    (await fetchFeatureData(FEATURE_NAMES.TRACK_LIST)) as TrackListItem[]
);

export const tracksSlice = createSlice({
  name: FEATURE_NAMES.TRACK_LIST,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TracksState>) => {
    builder.addCase(fetchAllTracks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAllTracks.fulfilled,
      (state, { payload }: PayloadAction<TrackListItem[]>) => {
        state.tracks = payload;
        state.isLoading = false;
      }
    );
  },
});

const selectSelf = (state: RootState): TracksState =>
  state[FEATURE_NAMES.TRACK_LIST];

export const trackListSelector = createSelector(
  selectSelf,
  ({ tracks }) => tracks
);

export const isTracksLoadingSelector = createSelector(
  selectSelf,
  ({ isLoading }) => isLoading
);
