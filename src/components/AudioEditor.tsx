import React, { ReactElement } from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks";
import { editorBlocksSelector } from "../store/editorSlice";
import { RootState } from "../store/store";
import { EditorBlock } from "../types";
import { EditorBlockContainer } from "./EditorBlockContainer";
import { ControlSection } from "./ControlSection";

const StyledContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 140px;
  background-color: #f3f4f6;
  border-radius: 8px;
`;

export const AudioEditor = (): ReactElement => {
  const editorBlocks = useAppSelector((state: RootState) =>
    editorBlocksSelector(state)
  );

  return (
    <StyledContainer>
      <ControlSection />
      {editorBlocks.map((props: EditorBlock) => (
        <EditorBlockContainer key={props.id} {...props} />
      ))}
    </StyledContainer>
  );
};
