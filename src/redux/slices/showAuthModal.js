import { createSlice } from "@reduxjs/toolkit";

const showAuthModal = createSlice({
  name: "showAuthModal",
  initialState: {
    show: false,
  },
  reducers: {
    setShowAuthModal: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setShowAuthModal } = showAuthModal.actions;
export default showAuthModal.reducer;
