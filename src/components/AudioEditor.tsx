import React, { ReactElement } from "react";
import styled from "styled-components";
import { Block } from "./Block";
import { ControlSection } from "./ControlSection";

const StyledContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 140px;
  background-color: #f3f4f6;
  border-radius: 8px;
`;

export const AudioEditor = (): ReactElement => (
  <StyledContainer>
    <ControlSection />
    {Array(30)
      .fill(null)
      .map((value, i) => (
        <Block key={i} />
      ))}
  </StyledContainer>
);
