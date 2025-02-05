import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

export default function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
