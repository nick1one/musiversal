import axios from "axios";
import {
  API,
  EDITOR_BLOCKS_NUM,
  EDITOR_LENGTH_SEC,
  EDITOR_SAMPLE_COLORS,
  FEATURE,
  FEATURE_NAMES,
} from "./constants";

interface GetOverlapIdsInputs {
  id: string;
  duration: number;
  blockIds: string[];
}

const BLOCKS_AMOUNT = EDITOR_LENGTH_SEC / EDITOR_BLOCKS_NUM;

export const getBlockSize = (duration: number): number =>
  Math.ceil(duration / BLOCKS_AMOUNT);

export const countOverlappedIds = ({
  id,
  duration,
  blockIds,
}: GetOverlapIdsInputs): string[] => {
  const overlappedBlocks = getBlockSize(duration);
  if (overlappedBlocks === 1) {
    return [id];
  }
  const currentIndex = blockIds.indexOf(id);
  const offset = currentIndex + overlappedBlocks;
  const xOverflowComp = offset - blockIds.length;
  const cutFromIndex =
    xOverflowComp > 0 ? currentIndex - xOverflowComp : currentIndex;
  return blockIds.slice(cutFromIndex, offset);
};

export const getRandomColor = () =>
  EDITOR_SAMPLE_COLORS[Math.ceil(Math.random() * 10) - 1];

export const fetchFeatureData = async (featureName: FEATURE_NAMES) => {
  try {
    const { data } = await axios.get(
      API.BASE + FEATURE[featureName].FETCH_DATA_URL
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};
