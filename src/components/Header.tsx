import React from "react";
import logo from "../assets/logo.svg";
import styled from "styled-components";
import { HEADER_TEXT } from "../constants";

const StyledHeader = styled.header`
  display: flex;
  box-sizing: border-box;
  flex: 1 100%;
  align-items: center;
  padding: 10px 20px;
  background: #111827;
  color: white;
  font-size: 16px;
  grid-area: header;
`;

const StyledLogo = styled.img`
  width: 36px;
  padding-right: 16px;
  user-select: none;
`;

export const Header = () => (
  <StyledHeader>
    <StyledLogo src={logo} />
    {HEADER_TEXT}
  </StyledHeader>
);
