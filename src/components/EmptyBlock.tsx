import React, { ReactElement } from "react";
import styled from "styled-components";
import { EDITOR_HOVER_COLOR } from "../constants";
import { EditorBlock } from "../types";
import droppableBlockHoc, { EventCallback } from "./DroppableBlockHoc";

export const StyledEditorBlock = styled.div`
  /* stylelint-disable */
  display: flex;
  flex: ${({ size }: EditorBlock) => size} 1 auto;
  border-left: 1px solid #e3e3e3;
  /* stylelint-enable */
`;

const HoverableBlock = styled(StyledEditorBlock)`
  /* stylelint-disable */
  &.dragOver {
    background-color: ${EDITOR_HOVER_COLOR};
  }
  /* stylelint-enable */
`;

export interface EditorBlockProps extends EditorBlock {
  isHovered: boolean;
  onDragEnter?: EventCallback;
  onDrop?: EventCallback;
  onDragOver?: EventCallback;
}

const EmptyBlock = ({
  isHovered,
  ...props
}: EditorBlockProps): ReactElement => (
  <HoverableBlock className={isHovered ? "dragOver" : ""} {...props} />
);

export default droppableBlockHoc(EmptyBlock);
