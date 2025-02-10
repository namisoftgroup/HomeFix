import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import showAuthModal from "./slices/showAuthModal";
import  clientData  from "./slices/clientData";

export const store = configureStore({
  reducer: {
    language: languageSlice,
    showAuthModal: showAuthModal,
    clientData: clientData
  },
});
