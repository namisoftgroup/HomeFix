import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import useAuth from "../hooks/useAuth";

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

  return loading || isLoading || servicesLoading ? (
    <PageLoader />
  ) : (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ResponsiveNav />
      <AuthModal />
    </>
  );
}
