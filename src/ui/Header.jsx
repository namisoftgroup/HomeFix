import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageDropDown from "./header/LanguageDropDown";
import UserDropDown from "./header/UserDropDown";
import useGetUserData from "../hooks/user/useGetUserData";
import useAuth from "../hooks/useAuth";
import GetApp from "./modals/GetApp";

export default function Header() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const { isAuthed } = useAuth();
  const { data: userData } = useGetUserData();

  return (
    <header>
      <nav className="container">
        <div className="d-flex align-items-center gap-5">
          <Link to="/" className="logo">
            <img src={"/images/logo.svg"} alt="logo" />
          </Link>

          <button className="download_btn" onClick={() => setShow(true)}>
            {t("downloadApp")}
          </button>
        </div>

        <div className="nav_links">
          <>
            <Link to="/">
              {localStorage.getItem("userType") === "technical"
                ? t("orders")
                : t("home")}
            </Link>
            <NavLink to="/aboutus">{t("aboutus")}</NavLink>

            {localStorage.getItem("userType") === "client" && (
              <Link to="/#services">{t("services")}</Link>
            )}

            <NavLink to="/contactus">{t("contactus")}</NavLink>
          </>
        </div>

        <div className="actions">
          {isAuthed && (
            <Link to="/notifications" className="rounded_btn">
              {userData?.notifications > 0 && (
                <span>{userData?.notifications}</span>
              )}
              <i className="fa-regular fa-bell"></i>
            </Link>
          )}

          <LanguageDropDown />
          <UserDropDown />
        </div>
      </nav>
      <GetApp show={show} setShow={setShow} />
    </header>
  );
}
