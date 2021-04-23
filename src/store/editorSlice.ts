import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { EDITOR_BLOCKS_NUM, FEATURE_NAMES } from "../constants";
import {
  countOverlappedIds,
  getBlockSize,
  getNameExtension,
  getRandomColor,
  sendTrackData,
} from "../helpers";
import { SampleListItem } from "./sampleListSlice";
import { RootState } from "./store";

export interface SampleData extends SampleListItem {
  color?: string;
}

export interface EditorBlock {
  id: string;
  size: number;
  sample?: SampleData;
}

interface DndData {
  overlappedIds: string[];
  sampleToInsert: SampleData | null;
}

interface EditorState {
  editorBlocks: EditorBlock[];
  dndData: DndData;
  currentTrackName: string;
  isLoading: boolean;
}

const initialState: EditorState = {
  editorBlocks: Array.from({ length: EDITOR_BLOCKS_NUM }, () => ({
    id: nanoid(),
    size: 1,
  })),
  dndData: {
    overlappedIds: [],
    sampleToInsert: null,
  },
  currentTrackName: "",
  isLoading: false,
};

export interface SaveTrackPayload {
  editorBlocks: Array<string | null | undefined>;
  currentTrackName: string;
}
export const saveTrack = createAsyncThunk(
  "saveTrack",
  async (editorState: SaveTrackPayload) => await sendTrackData(editorState)
);

export const editorSlice = createSlice({
  name: FEATURE_NAMES.EDITOR,
  initialState,
  reducers: {
    setTrackName: (state, { payload }: PayloadAction<string>) => {
      state.currentTrackName = payload;
    },
    saveDndData: (state, { payload }: PayloadAction<SampleListItem>) => {
      state.dndData.sampleToInsert = payload;
    },
    insertSample: (state) => {
      if (!state.dndData.sampleToInsert) return;

      const indexToReplace = state.editorBlocks.findIndex(
        ({ id }) => id === state.dndData.overlappedIds[0]
      );
      const sample = {
        ...state.dndData.sampleToInsert,
        color: getRandomColor(),
      };
      const size = getBlockSize(state.dndData.sampleToInsert.duration);

      const sampleBlock: EditorBlock = {
        id: state.dndData.overlappedIds[0],
        sample,
        size,
      };

      state.editorBlocks.splice(indexToReplace, size, sampleBlock);
    },
    resetOverlap: (state) => {
      state.dndData.overlappedIds = [];
      state.dndData.sampleToInsert = null;
    },
    drawOverlap: (state, { payload }: PayloadAction<string>) => {
      const duration = state.dndData.sampleToInsert?.duration;
      if (!duration) return;
      state.dndData.overlappedIds = countOverlappedIds({
        id: payload,
        duration,
        blockIds: state.editorBlocks.map(({ id }) => id),
      });
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<EditorState>) => {
    builder.addCase(saveTrack.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveTrack.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(saveTrack.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const selectSelf = (state: RootState): EditorState =>
  state[FEATURE_NAMES.EDITOR];

const selectDndData = createSelector(selectSelf, ({ dndData }) => dndData);

export const editorBlocksSelector = createSelector(
  selectSelf,
  ({ editorBlocks }) => editorBlocks
);

export const currentTrackSelector = createSelector(
  selectSelf,
  ({ currentTrackName }) => currentTrackName
);

export const isLoadingEditor = createSelector(
  selectSelf,
  ({ isLoading }) => isLoading
);

export const dndSampleSelector = createSelector(
  selectDndData,
  ({ sampleToInsert }) => sampleToInsert
);

export const overlapIdsSelector = createSelector(
  selectDndData,
  ({ overlappedIds }) => overlappedIds
);

export const editorExportDataSelector = createSelector(
  editorBlocksSelector,
  (editorBlocks) =>
    editorBlocks.map((value) =>
      value.sample ? getNameExtension(value.sample.path) : null
    )
);

export const {
  drawOverlap,
  resetOverlap,
  insertSample,
  saveDndData,
  setTrackName,
} = editorSlice.actions;

export default editorSlice.reducer;
