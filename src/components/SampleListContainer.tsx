import React, { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchAllSamples,
  isSamplesLoadingSelector,
  sampleListSelector,
} from "../store/sampleListSlice";
import { RootState } from "../store/store";
import DraggableSample from "./SoundFileBlock";
import { Spinner } from "./Spinner";

export const SampleListContainer = (): ReactElement => {
  const dispatch = useAppDispatch();

  const sampleList = useAppSelector((state: RootState) =>
    sampleListSelector(state)
  );
  const isLoading = useAppSelector((state: RootState) =>
    isSamplesLoadingSelector(state)
  );

  useEffect(() => {
    dispatch(fetchAllSamples());
  }, []);
  return (
    <>
      {isLoading && <Spinner />}
      {sampleList.map((props) => (
        <DraggableSample key={props.id} {...props} />
      ))}
    </>
  );
};
