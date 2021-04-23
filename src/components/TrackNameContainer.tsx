import { ChangeEvent } from "react";
import { DEFAULT_TRACK_NAME } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { currentTrackSelector, setTrackName } from "../store/editorSlice";
import { RootState } from "../store/store";
import { TrackName } from "./TrackName";

export const TrackNameContainer = () => {
  const dispatch = useAppDispatch();
  const currentTrackName = useAppSelector((state: RootState) =>
    currentTrackSelector(state)
  );
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTrackName(e.target.value));
  };
  return (
    <TrackName
      placeholder={DEFAULT_TRACK_NAME}
      onChange={onChangeHandler}
      value={currentTrackName}
    />
  );
};
