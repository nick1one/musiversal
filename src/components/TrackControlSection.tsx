import { ReactElement } from "react";
import styled from "styled-components";
import { DraftPreviewButtonContainer } from "./DraftPreviewButtonContainer";
import SaveButton from "./SaveButton";
import { TrackNameContainer } from "./TrackNameContainer";

export const TrackControlSection = (): ReactElement => (
  <FlexColumn>
    <div>
      <TrackNameContainer />
      <SaveButton />
    </div>
    <div>
      <DraftPreviewButtonContainer />
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
