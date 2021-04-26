import { configureStore } from "@reduxjs/toolkit";
import { FEATURE_NAMES } from "../constants";
import { editorSlice } from "./editorSlice";
import { rootSaga } from "./sagas";
import { sampleListSlice } from "./sampleListSlice";
import { tracksSlice } from "./tracksSlice";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    [FEATURE_NAMES.EDITOR]: editorSlice.reducer,
    [FEATURE_NAMES.SAMPLE_LIST]: sampleListSlice.reducer,
    [FEATURE_NAMES.TRACK_LIST]: tracksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
