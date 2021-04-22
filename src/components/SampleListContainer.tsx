import React, { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchAllSamples,
  isLoadingSelector,
  sampleListSelector,
} from "../store/sampleListSlice";
import { RootState } from "../store/store";
import Sample from "./Sample";
import { Spinner } from "./Spinner";

export const SampleListContainer = (): ReactElement => {
  const dispatch = useAppDispatch();

  const sampleList = useAppSelector((state: RootState) =>
    sampleListSelector(state)
  );
  const isLoading = useAppSelector((state: RootState) =>
    isLoadingSelector(state)
  );

  useEffect(() => {
    dispatch(fetchAllSamples());
  }, []);
  return (
    <>
      {isLoading && <Spinner />}
      {sampleList.map((props) => (
        <Sample key={props.id} {...props} />
      ))}
    </>
  );
};
