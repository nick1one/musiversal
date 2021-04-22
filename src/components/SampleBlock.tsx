import React, { ReactElement } from "react";
import styled from "styled-components";
import { EditorBlock } from "../store/editorSlice";
import { StyledEditorBlock } from "./EmptyBlock";
import ReactTooltip from "react-tooltip";

const StyledSample = styled(StyledEditorBlock)`
  position: relative;
  align-items: flex-end;
  border-color: #f3f4f6;
  /* stylelint-disable */
  background-color: ${({ sample: { color } }: EditorBlock) => color};
  /* stylelint-enable */
  border-radius: 8px;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  user-select: none;

  span {
    position: absolute;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    color: #f3f4f6;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const SampleBlock = (props: EditorBlock): ReactElement => (
  <StyledSample {...props} data-tip={props.sample?.name}>
    <span>{props.sample?.name}</span>
    <ReactTooltip />
  </StyledSample>
);
