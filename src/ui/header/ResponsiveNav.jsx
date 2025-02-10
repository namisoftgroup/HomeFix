import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ResponsiveNav() {
  const { t } = useTranslation();
  return (
    <div className="small_menu">
      <Link aria-label="Home" to="/" className="menu_item">
        <i className="fa-solid fa-house-chimney"></i>
        <span>{t("home")}</span>
      </Link>

      <Link aria-label="List" to="/list" className="menu_item">
        <i className="fa-solid fa-list-check"></i>
        <span> {t("header.list")}</span>
      </Link>

      <Link aria-label="Settings" to="/settings" className="menu_item">
        <i className="fa-solid fa-gear"></i>
        <span>{t("header.settings")}</span>
      </Link>
    </div>
  );
}

export default ResponsiveNav;
