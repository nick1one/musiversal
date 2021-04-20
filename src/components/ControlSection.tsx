import { ReactElement } from "react";
import styled from "styled-components";
import { DEFAULT_TRACK_NAME, SAVE_BUTTON_CAPTION } from "../constants";
import { PlayButton } from "./PlayButton";

const StyledDiv = styled.div`
  display: flex;
  max-width: 136px;
  flex: 0 0 136px;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding: 12px;
  background: #f9fafb;
  word-break: break-all;

  button:last-child {
    margin: 0;
  }
`;

const SaveButton = styled.button`
  width: 44px;
  height: 23px;
  border: none;
  margin: 6px 0;
  background: #e5e7eb;
  border-radius: 23px;
  cursor: pointer;
`;

const TrackName = styled.span`
  color: #1f2937;
  letter-spacing: -0.03em;
  line-height: 17px;
`;

export const ControlSection = (): ReactElement => (
  <StyledDiv>
    <TrackName>{DEFAULT_TRACK_NAME}</TrackName>
    <SaveButton>{SAVE_BUTTON_CAPTION}</SaveButton>
    <PlayButton />
  </StyledDiv>
);
