import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    language: languageSlice
  },
});
