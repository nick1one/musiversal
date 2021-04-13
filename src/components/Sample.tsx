import React, { ReactElement } from "react";
import styled from "styled-components";
import { PlayButton } from "./PlayButton";

interface SampleProps {
  sampleName: string;
}

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

export const Sample = ({ sampleName }: SampleProps): ReactElement => (
  <StyledSample draggable>
    <PlayButton />
    {sampleName}
  </StyledSample>
);
