import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageDropDown from "./header/LanguageDropDown";
import UserDropDown from "./header/UserDropDown";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <nav className="container">
        <Link to="/" className="logo">
          <img src={"/images/logo.svg"} alt="logo" />
        </Link>

        <div className="nav_links">
          <>
            <Link to="/">
              {localStorage.getItem("userType") === "technical"
                ? t("orders")
                : t("home")}
            </Link>
            <NavLink to="/aboutus">{t("aboutus")}</NavLink>
            <Link to="/#services">{t("services")}</Link>
            <NavLink to="/contactus">{t("contactus")}</NavLink>
          </>
        </div>

        <div className="actions">
          <LanguageDropDown />
          <UserDropDown />
        </div>
      </nav>
    </header>
  );
}
