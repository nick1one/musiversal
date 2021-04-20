import React, { ReactElement } from "react";
import styled from "styled-components";
import { SAMPLES_TITLE } from "../constants";
import { SampleListContainer } from "./SampleListContainer";

const StyledSidebar = styled.aside`
  box-sizing: border-box;
  padding: 12px 24px;
  border-right: 2px solid #d1d5db;
  background: #f9fafb;
  grid-area: sidebar;
`;

const StyledSamplesTitle = styled.h2`
  color: #4c4e50;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 22px;
`;

export const Sidebar = (): ReactElement => (
  <StyledSidebar>
    <StyledSamplesTitle>{SAMPLES_TITLE}</StyledSamplesTitle>
    <SampleListContainer />
  </StyledSidebar>
);
