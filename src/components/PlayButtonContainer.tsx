import Aural from "aural";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
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
  const sampleList = useAppSelector((state: RootState) =>
    sampleListSelector(state)
  );
  const tracks = useAppSelector((state: RootState) => trackListSelector(state));
  const [loadedPromise, setLoadedPromise] = useState(null);
  const [isLoading, setLoadingStatus] = useState(true);
  const [isPlaying, setPlayingStatus] = useState(false);

  const stopAllPLayers = () => {
    sampleList.map(({ id }) => Aural.stop(id));
    tracks.map(({ id }) => Aural.stop(id));
  };

  const cleaningCallback = () => {
    setPlayingStatus(false);
    setLoadingStatus(false);
    if (!loadedPromise) return;
    // @ts-ignore
    loadedPromise.then(() => {
      Aural.stop(id);
    });
  };

  useEffect(() => {
    setLoadedPromise(
      Aural.load(id, path).then(() => {
        setLoadingStatus(false);
      })
    );
    return cleaningCallback;
  }, []);

  const onClickHandler = () => {
    if (!loadedPromise) return;
    // @ts-ignore
    loadedPromise.then(() => {
      if (isPlaying) {
        Aural.stop(id);
        setPlayingStatus(false);
        return;
      }
      stopAllPLayers();
      setPlayingStatus(true);
      Aural.play(id);
      setTimeout(() => {
        setPlayingStatus(false);
      }, duration * SEC);
    });
  };

  const playButtonProps = {
    path,
    id,
    onClickHandler,
    isLoading,
    isPlaying,
  };
  return <PlayButton {...playButtonProps} />;
};
