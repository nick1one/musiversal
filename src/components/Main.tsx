import React from "react";
import styled from "styled-components";
import { AudioEditor } from "./AudioEditor";
import { SavedTracks } from "./SavedTracks";

const StyledMain = styled.main`
  padding: 24px 12px;
  grid-area: main;
`;

export const Main = () => (
  <StyledMain>
    <AudioEditor />
    <SavedTracks />
  </StyledMain>
);
