import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  drawOverlap,
  dndSampleSelector,
  insertSample,
} from "../store/editorSlice";
import { RootState } from "../store/store";
import { EditorBlockProps } from "./EmptyBlock";

export type EventCallback = (e: React.DragEvent<HTMLDivElement>) => void;

const onDragOverHandler: EventCallback = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export default (BlockComponent: React.FunctionComponent<EditorBlockProps>) => (
  props: EditorBlockProps
) => {
  const dispatch = useAppDispatch();
  const sampleToInsert = useAppSelector((state: RootState) =>
    dndSampleSelector(state)
  );

  const { id } = props;
  return (
    <BlockComponent
      onDrop={() => {
        sampleToInsert && dispatch(insertSample());
      }}
      onDragOver={onDragOverHandler}
      onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        sampleToInsert && dispatch(drawOverlap(id));
      }}
      {...props}
    />
  );
};
