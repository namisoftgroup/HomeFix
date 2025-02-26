import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Footer() {
  const { t } = useTranslation();
  const { client } = useSelector((state) => state.clientData);

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6 col-12 p-2">
            <div className="col">
              <Link className="logo">
                <img src={"/images/logo.svg"} alt="logo" />
              </Link>
              <p>{t("footerTitle")}</p>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-12 p-2">
            <div className="col">
              <h5>{t("support")}</h5>
              <div className="links">
                <Link to="/contactus">{t("contactus")}</Link>
                <Link to="/terms-and-conditions">
                  {t("termsAndConditions")}
                </Link>
                <Link to="/privacy">{t("privacyPolicy")}</Link>
                <Link to="/faqs">{t("faqs")}</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-12 p-2">
            <div className="col">
              <h5>{t("quickLinks")}</h5>
              <div className="links">
                <Link to="/">{t("home")}</Link>
                <Link to="/aboutus">{t("aboutus")}</Link>
                <Link to="/#services">{t("services")}</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <div className="col">
              <h5>{t("downloadApp")}</h5>

              <div className="btns">
                <Link
                  aria-label="Apple App"
                  to="https://apps.apple.com/app/home-fix-technical/id6740774757"
                  target="_blank"
                >
                  <img src="/icons/appStore.svg" alt="" />
                </Link>
                <Link
                  aria-label="Android App"
                  target="_blank"
                  to="https://play.google.com/store/apps/details?id=com.apps.homefix"
                >
                  <img src="/icons/playStore.svg" alt="" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 p-2">
            <div
              className={`copy_rights ${
                !client?.id ? "client" : client?.type === "client" ? "client" : ""
              }`}
            >
              <p>
                &copy; {new Date().getFullYear()} {t("copyright")}
                <Link to="/"> {t("HomeFix")} </Link>
              </p>

              {/* <div className="follow">
                <div className="social_media">
                  <Link to="https://www.facebook.com">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                  <Link to="https://wa.me/9620791729798">
                    <i className="fa-brands fa-whatsapp"></i>
                  </Link>
                  <Link to="https://www.instagram.com/homefixservices/#">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link to="/">
                    <i className="fa-brands fa-youtube"></i>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
