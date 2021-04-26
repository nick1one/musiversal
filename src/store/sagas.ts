import { takeEvery, select, put } from "redux-saga/effects";
import { stopAuralPlayers } from "../helpers";
import {
  editorExportDataSelector,
  saveDraft,
  setActivePlayerId,
} from "./editorSlice";

function* saveDraftSaga() {
  // @ts-ignore
  const exportData = yield select(editorExportDataSelector);
  yield put(
    // @ts-ignore
    saveDraft({
      editorBlocks: exportData,
      currentTrackName: "",
      isDraft: true,
    })
  );
}

function* stopEveryPlayer() {
  stopAuralPlayers();
  yield put(setActivePlayerId(""));
}

export function* rootSaga() {
  yield takeEvery("editor/insertSample", saveDraftSaga);
  yield takeEvery("editor/saveDndData", stopEveryPlayer);
}
