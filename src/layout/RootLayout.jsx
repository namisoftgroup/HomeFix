import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { requestPermission, listenToMessages } from "../firebase/service";
import AOS from "aos";
import useAuth from "../hooks/useAuth";

import useGetOrder from "../hooks/orders/useGetOrder";
import useGetProviderOrders from "../hooks/orders/useGetProviderOrders";
import useGetOrders from "../hooks/orders/useGetOrders";
import useGetNotifications from "../hooks/settings/useGetNotifications";
import useGetUserData from "../hooks/user/useGetUserData";

import Header from "../ui/Header";
import Footer from "../ui/Footer";
import AuthModal from "../ui/modals/AuthModal";
import PageLoader from "../ui/loaders/PageLoader";
import ResponsiveNav from "../ui/header/ResponsiveNav";
import useGetHomeSlider from "../hooks/home/useGetHomeSlider";
import useGetServices from "./../hooks/home/useGetServices";

export default function RootLayout() {
  const location = useLocation();
  const { isLoading } = useGetHomeSlider();
  const { isLoading: servicesLoading } = useGetServices();
  const { loading } = useAuth();

  const { refetch: refetchOrder } = useGetOrder();
  const { refetch: refetchOrders } = useGetOrders();
  const { refetch: refetchUserData } = useGetUserData();
  const { refetch: refetchNotifications } = useGetNotifications();
  const { refetch: refetchProviderOrders } = useGetProviderOrders();

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionDivs = section.querySelectorAll("[data-aos]");
      sectionDivs.forEach((div, index) => {
        div.setAttribute("data-aos-delay", (index + 1) * 150);
      });
    });

    AOS.init({
      offset: 100,
      delay: 50,
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => AOS.refresh(), 100);
    window.scrollTo(0, 0);

    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 200);
    }
  }, [location]);

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

  return loading || isLoading || servicesLoading ? (
    <PageLoader />
  ) : (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {localStorage.getItem("userType") === "client" && <ResponsiveNav />}
      <AuthModal />
    </>
  );
}
