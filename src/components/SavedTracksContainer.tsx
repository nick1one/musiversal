import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store/store";
import {
  fetchAllTracks,
  isTracksLoadingSelector,
  trackListSelector,
} from "../store/tracksSlice";
import { SavedTracks } from "./SavedTracks";

export const SavedTracksContainer = () => {
  const dispatch = useAppDispatch();

  const tracks = useAppSelector((state: RootState) => trackListSelector(state));
  const isLoading = useAppSelector((state: RootState) =>
    isTracksLoadingSelector(state)
  );

  useEffect(() => {
    dispatch(fetchAllTracks());
  }, []);
  const props = { isLoading, tracks };
  return <SavedTracks {...props} />;
};
