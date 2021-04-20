import React from "react";
import { useAppDispatch } from "../hooks";
import { resetOverlap, saveDndData } from "../store/editorSlice";
import { SampleProps } from "./Sample";

export const draggableSampleHoc = (
  SampleComponent: React.FunctionComponent<any>
) => (props: SampleProps) => {
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
