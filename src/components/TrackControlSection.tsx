import { ReactElement } from "react";
import styled from "styled-components";
import { DEFAULT_TRACK_NAME, SAVE_BUTTON_CAPTION } from "../constants";
import { PlayButton } from "./PlayButton";

const FlexColumn = styled.div`
  display: flex;
  max-width: 136px;
  flex: 0 0 136px;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding: 12px;
  background: #f9fafb;
  word-break: break-all;

  div:first-child {
    flex: 1 1 auto;
  }
  div:last-child {
    flex: 0 0 35px;
    button {
      margin: 0;
    }
  }
`;

const SaveButton = styled.button`
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

const TrackName = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  color: #1f2937;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

export const TrackControlSection = (): ReactElement => (
  <FlexColumn>
    <div>
      <TrackName
        placeholder={DEFAULT_TRACK_NAME}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <SaveButton>{SAVE_BUTTON_CAPTION}</SaveButton>
    </div>
    <div>
      <PlayButton />
    </div>
  </FlexColumn>
);
