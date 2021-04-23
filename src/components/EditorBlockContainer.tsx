import React from "react";
import { useAppSelector } from "../hooks";
import { EditorBlock, overlapIdsSelector } from "../store/editorSlice";
import { RootState } from "../store/store";
import Block from "./EmptyBlock";
import { SampleBlock } from "./SampleBlock";

export const EditorBlockContainer = ({ ...props }: EditorBlock) => {
  const overlappedIds = useAppSelector((state: RootState) =>
    overlapIdsSelector(state)
  );

  return props.sample ? (
    <SampleBlock {...props} />
  ) : (
    <Block {...{ isHovered: overlappedIds.includes(props.id), ...props }} />
  );
};
