import React, { ReactElement } from "react";
import { useAppDispatch } from "../hooks";
import { resetOverlap, saveDndData } from "../store/editorSlice";
import { SampleListItem } from "../store/sampleListSlice";
import { EventCallback } from "./DroppableBlockHoc";

export interface DraggableSample extends SampleListItem {
  draggable: boolean;
  onDragStart: EventCallback;
  onDragEnd: EventCallback;
}

export const draggableSampleHoc = (
  SampleComponent: React.FunctionComponent<DraggableSample>
) => (props: SampleListItem): ReactElement => {
  const dispatch = useAppDispatch();
  return (
    <SampleComponent
      {...props}
      draggable
      onDragStart={() => dispatch(saveDndData(props))}
      onDragEnd={() => {
        dispatch(resetOverlap());
      }}
    />
  );
};
