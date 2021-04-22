import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  DEFAULT_TRACK_NAME,
  EDITOR_BLOCKS_NUM,
  EDITOR_FEATURE_NAME,
  SAMPLE_DUMMY_DATA,
} from "../constants";
import { countOverlappedIds, getBlockSize, getRandomColor } from "../helpers";
import { SampleListItem } from "./sampleListSlice";
import { RootState } from "./store";

export interface SampleData {
  name: string;
  duration: number;
  color?: string;
}

export interface EditorBlock {
  id: string;
  size: number;
  sample: SampleData;
}

interface DndData {
  overlappedIds: string[];
  sampleToInsert: SampleData | null;
}

interface EditorState {
  editorBlocks: EditorBlock[];
  dndData: DndData;
  currentTrackName: string;
}

const initialState: EditorState = {
  editorBlocks: Array.from({ length: EDITOR_BLOCKS_NUM }, () => ({
    id: nanoid(),
    size: 1,
    sample: SAMPLE_DUMMY_DATA,
  })),
  dndData: {
    overlappedIds: [],
    sampleToInsert: null,
  },
  currentTrackName: DEFAULT_TRACK_NAME,
};

export const editorSlice = createSlice({
  name: EDITOR_FEATURE_NAME,
  initialState,
  reducers: {
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
    // saveCurrentTrack: (state, action) => {},
  },
});

const selectSelf = (state: RootState): EditorState =>
  state[EDITOR_FEATURE_NAME];

const selectDndData = createSelector(selectSelf, ({ dndData }) => dndData);

export const editorBlocksSelector = createSelector(
  selectSelf,
  ({ editorBlocks }) => editorBlocks
);

export const currentTrackSelector = createSelector(
  selectSelf,
  ({ currentTrackName }) => currentTrackName
);

export const dndSampleSelector = createSelector(
  selectDndData,
  ({ sampleToInsert }) => sampleToInsert
);

export const overlapIdsSelector = createSelector(
  selectDndData,
  ({ overlappedIds }) => overlappedIds
);

export const {
  drawOverlap,
  resetOverlap,
  insertSample,
  saveDndData,
} = editorSlice.actions;

export default editorSlice.reducer;
