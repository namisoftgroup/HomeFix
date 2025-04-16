import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import { listenToMessages, requestPermission } from "./firebase/service";

import i18n from "./utils/i18n";
import useGetOrder from "./hooks/orders/useGetOrder";
import useGetProviderOrders from "./hooks/orders/useGetProviderOrders";
import useGetOrders from "./hooks/orders/useGetOrders";
import useGetNotifications from "./hooks/settings/useGetNotifications";
import useGetUserData from "./hooks/user/useGetUserData";

export default function App() {
  const { lang } = useSelector((state) => state.language);
  const { client } = useSelector((state) => state.clientData);
  const { refetch: refetchOrder } = useGetOrder();
  const { refetch: refetchOrders } = useGetOrders();
  const { refetch: refetchUserData } = useGetUserData();
  const { refetch: refetchNotifications } = useGetNotifications();
  const { refetch: refetchProviderOrders } = useGetProviderOrders();

  useEffect(() => {
    localStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("userType", client?.type || "client");
  }, [client]);

  useEffect(() => {
    const initializeNotifications = async () => {
      await requestPermission();
      const unsubscribe = listenToMessages(
        refetchOrder,
        refetchOrders,
        refetchProviderOrders,
        refetchNotifications,
        refetchUserData
      );
      return () => {
        if (unsubscribe) unsubscribe();
      };
    };

    initializeNotifications();
  }, [
    refetchOrder,
    refetchOrders,
    refetchProviderOrders,
    refetchUserData,
    refetchNotifications,
  ]);

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
