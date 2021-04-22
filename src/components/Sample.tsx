import React, { ReactElement } from "react";
import styled from "styled-components";
import { SampleListItem } from "../store/sampleListSlice";
import { PlayButtonContainer } from "./PlayButtonContainer";
import { draggableSampleHoc } from "./DraggableSampleHoc";

const StyledSample = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 8px;
  background: #f3f4f6;
  border-radius: 8px;
  color: #1f2937;
  cursor: pointer;
  letter-spacing: -0.03em;
  user-select: none;
  &:hover {
    background-color: #f7f0ee;
  }
`;

const Sample = ({ path, name, duration, id }: SampleListItem): ReactElement => {
  return (
    <StyledSample>
      <PlayButtonContainer {...{ path, duration, id }} />
      {name}
    </StyledSample>
  );
};

export default draggableSampleHoc(Sample);
