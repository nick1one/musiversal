import React from "react";
import styled from "styled-components";
import play from "../assets/play-button.svg";

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  margin: 12px;
  background: none;
  cursor: pointer;
`;

export const PlayButton = () => (
  <StyledButton>
    <img src={play} alt="" />
  </StyledButton>
);
