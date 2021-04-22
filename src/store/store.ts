import { configureStore } from "@reduxjs/toolkit";
import { FEATURE_NAMES } from "../constants";
import { editorSlice } from "./editorSlice";
import { sampleListSlice } from "./sampleListSlice";

const store = configureStore({
  reducer: {
    [FEATURE_NAMES.EDITOR]: editorSlice.reducer,
    [FEATURE_NAMES.SAMLE_LIST]: sampleListSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
