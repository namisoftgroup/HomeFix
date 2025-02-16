import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function ResponsiveNav() {
  const { t } = useTranslation();
  const location = useLocation(); 

  return (
    <div className="small_menu">
    <Link
      aria-label="Home"
      to="/"
      className={`menu_item ${location.pathname === "/" ? "active" : ""}`}
    >
      <i className="fa-solid fa-house-chimney"></i>
      <span>{t("home")}</span>
    </Link>

    <Link
      aria-label="List"
      to="/Orders"
      className={`menu_item ${location.pathname === "/my-orders" ? "active" : ""}`}
    >
      <i className="fa-solid fa-list-check"></i>
      <span>{t("header.list")}</span>
    </Link>

    <Link
      aria-label="Settings"
      to="/settings"
      className={`menu_item ${location.pathname === "/settings" ? "active" : ""}`}
    >
      <i className="fa-solid fa-gear"></i>
      <span>{t("header.settings")}</span>
    </Link>
  </div>
  );
}

export default ResponsiveNav;
