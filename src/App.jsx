import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";

import i18n from "./utils/i18n";

export default function App() {
  const { lang } = useSelector((state) => state.language);
  const { client } = useSelector((state) => state.clientData);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("userType", client?.type || "client");
  }, [client]);

  return (
    <>
      <Toaster
        expand={false}
        duration={2000}
        richColors
        position="bottom-right"
      />
      <RouterProvider router={router} />
    </>
  );
}
