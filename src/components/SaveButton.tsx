import { useEffect } from "react";
import styled from "styled-components";
import { DEFAULT_TRACK_NAME, SAVE_BUTTON_CAPTION } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  currentTrackSelector,
  editorExportDataSelector,
  isLoadingEditor,
  saveTrack,
  SaveTrackPayload,
} from "../store/editorSlice";
import { RootState } from "../store/store";
import { fetchAllTracks } from "../store/tracksSlice";

export default () => {
  const dispatch = useAppDispatch();
  const currentTrackName = useAppSelector((state: RootState) =>
    currentTrackSelector(state)
  );
  const exportData = useAppSelector((state: RootState) =>
    editorExportDataSelector(state)
  );
  const isLoading = useAppSelector((state: RootState) =>
    isLoadingEditor(state)
  );

  useEffect(() => {
    if (isLoading) return;
    dispatch(fetchAllTracks());
  }, [isLoading]);

  const payload: SaveTrackPayload = {
    editorBlocks: exportData,
    currentTrackName: currentTrackName ? currentTrackName : DEFAULT_TRACK_NAME,
  };
  return (
    <StyledButton
      disabled={isLoading}
      onClick={() => {
        exportData.some((sample) => !!sample) && dispatch(saveTrack(payload));
      }}
    >
      {isLoading ? "---" : SAVE_BUTTON_CAPTION}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 44px;
  height: 23px;
  border: none;
  margin: 4px 0;
  background: #e5e7eb;
  border-radius: 23px;
  color: #6d737c;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  user-select: none;
  &:hover {
    background-color: #de6139;
    color: #fff;
  }
  &:active {
    transform: scale(0.9, 0.9);
  }
`;
