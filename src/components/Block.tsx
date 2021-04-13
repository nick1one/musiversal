import React, { ReactElement } from "react";
import styled from "styled-components";

const StyledBlock = styled.div`
  flex: 1 1 auto;
  border-left: 1px solid #e3e3e3;
`;
export const Block = (): ReactElement => <StyledBlock></StyledBlock>;
