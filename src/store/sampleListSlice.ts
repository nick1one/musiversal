import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { FEATURE_NAMES } from "../constants";
import { fetchFeatureData } from "../helpers";
import { RootState } from "./store";

export interface SampleListItem {
  id: string;
  name: string;
  path: string;
  duration: number;
}

interface SampleListState {
  samples: SampleListItem[];
  isLoading: boolean;
}

const initialState: SampleListState = {
  samples: [],
  isLoading: false,
};

export const fetchAllSamples = createAsyncThunk<SampleListItem[]>(
  "fetchAllSamples",
  async () =>
    (await fetchFeatureData(FEATURE_NAMES.SAMPLE_LIST)) as SampleListItem[]
);

export const sampleListSlice = createSlice({
  name: FEATURE_NAMES.SAMPLE_LIST,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SampleListState>) => {
    builder.addCase(fetchAllSamples.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAllSamples.fulfilled,
      (state, { payload }: PayloadAction<SampleListItem[]>) => {
        state.samples = payload;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchAllSamples.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const selectSelf = (state: RootState): SampleListState =>
  state[FEATURE_NAMES.SAMPLE_LIST];

export const sampleListSelector = createSelector(
  selectSelf,
  ({ samples }) => samples
);

export const isSamplesLoadingSelector = createSelector(
  selectSelf,
  ({ isLoading }) => isLoading
);
