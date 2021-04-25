import {
  DRAFT_AUDIO_PLAYER_ID,
  DRAFT_URL,
  EDITOR_LENGTH_SEC,
} from "../constants";
import { useAppSelector } from "../hooks";
import { isDraftReadySelector } from "../store/editorSlice";
import { RootState } from "../store/store";
import { PlayButtonContainer } from "./PlayButtonContainer";

export const DraftPreviewButtonContainer = () => {
  const draftIsReady = useAppSelector((state: RootState) =>
    isDraftReadySelector(state)
  );
  return (
    <PlayButtonContainer
      {...{
        id: DRAFT_AUDIO_PLAYER_ID,
        duration: EDITOR_LENGTH_SEC,
        path: draftIsReady ? DRAFT_URL : "",
      }}
    />
  );
};
