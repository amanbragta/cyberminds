import { configureStore } from "@reduxjs/toolkit";
import postingReducer from "./postingSlice.js";

const store = configureStore({
  reducer: {
    posting: postingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
