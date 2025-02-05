import { createSlice } from "@reduxjs/toolkit";

const language = createSlice({
  name: "language",

  initialState: {
    lang: localStorage.getItem("lang") || "ar",
  },

  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
    },
  },
});

export const { setLanguage } = language.actions;
export default language.reducer;
