import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import AuthModal from "../ui/modals/AuthModal";
import useAuth from "../hooks/useAuth";
import ResponsiveNav from "../ui/header/ResponsiveNav";

export default function RootLayout() {
  const location = useLocation();
  const { loading, isAuthed } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return loading ? (
    <h6>Loading ...</h6>
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
