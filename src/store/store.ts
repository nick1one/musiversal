import { configureStore } from "@reduxjs/toolkit";
import { EDITOR_FEATURE_NAME, SAMPLE_LIST_FEATURE_NAME } from "../constants";
import { editorSlice } from "./editorSlice";
import { sampleListSlice } from "./sampleListSlice";

const store = configureStore({
  reducer: {
    [EDITOR_FEATURE_NAME]: editorSlice.reducer,
    [SAMPLE_LIST_FEATURE_NAME]: sampleListSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
