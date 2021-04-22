import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { SAMPLE_LIST_FEATURE_NAME } from "../constants";
import { fetchSampleList } from "../helpers";
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
  async () => (await fetchSampleList()) as SampleListItem[]
);

export const sampleListSlice = createSlice({
  name: SAMPLE_LIST_FEATURE_NAME,
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
  state[SAMPLE_LIST_FEATURE_NAME];

export const sampleListSelector = createSelector(
  selectSelf,
  ({ samples }) => samples
);

export const isLoadingSelector = createSelector(
  selectSelf,
  ({ isLoading }) => isLoading
);
