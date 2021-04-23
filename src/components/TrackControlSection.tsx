import { ReactElement, useEffect } from "react";
import styled from "styled-components";
import { PlayButton } from "./PlayButton";
import SaveButton from "./SaveButton";
import { TrackNameContainer } from "./TrackNameContainer";
import Crunker from "crunker/dist/crunker.js";

const EditorPlayContainer = () => {
  useEffect(() => {
    const crunker = new Crunker();
  }, []);
  return <PlayButton />;
};

export const TrackControlSection = (): ReactElement => (
  <FlexColumn>
    <div>
      <TrackNameContainer />
      <SaveButton />
    </div>
    <div>
      <PlayButton />
    </div>
  </FlexColumn>
);

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
