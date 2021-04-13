import React from "react";
import styled from "styled-components";
import { AudioEditor } from "./AudioEditor";

const StyledMain = styled.main`
  padding: 24px 12px;
  grid-area: main;
`;

export const Main = () => (
  <StyledMain>
    <AudioEditor />
  </StyledMain>
);
