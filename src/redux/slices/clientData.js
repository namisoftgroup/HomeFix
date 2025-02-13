import { createSlice } from "@reduxjs/toolkit";

export const clientData = createSlice({
  name: "clientData",
  initialState: {
    client: {},
  },
  reducers: {
    setClientData: (state, action) => {
      state.client = action.payload;
    },

    updateClientData: (state, action) => {
      state.client = { ...state.client, ...action.payload };
    },

    logout: (state) => {
      state.client = {};
    },
  },
});

export const { setClientData, updateClientData, logout } = clientData.actions;
export default clientData.reducer;
