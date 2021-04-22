import Aural from "aural";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { sampleListSelector } from "../store/sampleListSlice";
import { RootState } from "../store/store";
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
  const [loadedPromise, setLoadedPromise] = useState(null);
  const [isLoading, setLoadingStatus] = useState(true);
  const [isPlaying, setPlayingStatus] = useState(false);
  useEffect(() => {
    setLoadedPromise(
      Aural.load(id, path).then(() => {
        setLoadingStatus(false);
      })
    );
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
      sampleList.map(({ id }) => Aural.stop(id));
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
