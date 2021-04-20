import React from "react";
import { useAppSelector } from "../hooks";
import { overlapIdsSelector } from "../store/editorSlice";
import { RootState } from "../store/store";
import { EditorBlock } from "../types";
import Block from "./EmptyBlock";
import { SampleBlock } from "./SampleBlock";

export const EditorBlockContainer = ({ ...props }: EditorBlock) => {
  const overlappedIds = useAppSelector((state: RootState) =>
    overlapIdsSelector(state)
  );

  return props.sample.sampleName ? (
    <SampleBlock {...props} />
  ) : (
    <Block {...{ isHovered: overlappedIds.includes(props.id), ...props }} />
  );
};
