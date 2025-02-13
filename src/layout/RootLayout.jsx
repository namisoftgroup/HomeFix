import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import AuthModal from "../ui/modals/AuthModal";
import useAuth from "../hooks/useAuth";
import ResponsiveNav from "../ui/header/ResponsiveNav";
import PageLoader from "../ui/loaders/PageLoader";

export default function RootLayout() {
  const location = useLocation();
  const { loading, isAuthed } = useAuth();

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
  }, [location]);

  return loading ? (
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
