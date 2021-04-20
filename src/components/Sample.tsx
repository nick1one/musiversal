import React, { ReactElement } from "react";
import styled from "styled-components";
import { SampleData } from "../types";
import { draggableSampleHoc } from "./DraggableSampleHoc";
import { PlayButton } from "./PlayButton";

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
`;

export type SampleProps = SampleData;

const Sample = ({ sampleName, ...props }: SampleProps): ReactElement => (
  <StyledSample {...props}>
    <PlayButton />
    {sampleName}
  </StyledSample>
);

export default draggableSampleHoc(Sample);
