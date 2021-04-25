import Aural from "aural";
import React, { useEffect, useState } from "react";
import { DRAFT_AUDIO_PLAYER_ID } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  activePlayerIdSelector,
  setActivePlayerId,
} from "../store/editorSlice";
import { sampleListSelector } from "../store/sampleListSlice";
import { RootState } from "../store/store";
import { trackListSelector } from "../store/tracksSlice";
import { PlayButton } from "./PlayButton";

interface AudioPlayerProps {
  id: string;
  path: string;
  duration: number;
}

const SEC = 1000;
export const PlayButtonContainer = ({
  path,
  duration,
  id,
}: AudioPlayerProps) => {
  const dispatch = useAppDispatch();
  const sampleList = useAppSelector((state: RootState) =>
    sampleListSelector(state)
  );
  const tracks = useAppSelector((state: RootState) => trackListSelector(state));
  const currentPlayingId = useAppSelector((state: RootState) =>
    activePlayerIdSelector(state)
  );
  const isPlaying = id === currentPlayingId;
  const [loadedPromise, setLoadedPromise] = useState(null);
  const [isLoading, setLoadingStatus] = useState(!!path);

  const stopAllPLayers = () => {
    sampleList.map(({ id }) => Aural.stop(id));
    tracks.map(({ id }) => Aural.stop(id));
    Aural.stop(DRAFT_AUDIO_PLAYER_ID);
  };

  const cleaningCallback = () => {
    setLoadingStatus(false);
    if (!loadedPromise) return;
    // @ts-ignore
    loadedPromise.then(() => {
      Aural.stop(id);
    });
  };

  useEffect(() => {
    if (!path) return;
    setLoadedPromise(
      Aural.load(id, path).then(() => {
        setLoadingStatus(false);
      })
    );
    return cleaningCallback;
  }, [path]);

  const onClickHandler = () => {
    if (!loadedPromise) return;
    // @ts-ignore
    loadedPromise.then(() => {
      if (isPlaying) {
        dispatch(setActivePlayerId(""));
        Aural.stop(id);
        return;
      }
      stopAllPLayers();
      dispatch(setActivePlayerId(id));
      Aural.play(id);
      setTimeout(() => {
        dispatch(setActivePlayerId(""));
      }, duration * SEC);
    });
  };

  const playButtonProps = {
    onClickHandler,
    isLoading,
    isPlaying,
    isDisabled: !path,
  };
  return <PlayButton {...playButtonProps} />;
};
