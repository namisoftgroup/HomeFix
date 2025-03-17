import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function GetApp({ show, setShow }) {
  const { t } = useTranslation();
  return (
    <Modal
      centered
      show={show}
      onHide={() => setShow(false)}
      className="getAppModal"
    >
      <Modal.Body>
        <h4 className="modalTitle mb-3">
          {t("getApp.title")} <span> {t("appName")} </span>
        </h4>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <div className="app_container">
            <h6 className="mb-3">{t("getApp.technicalApp")}</h6>
            <div className="btns">
              <Link
                aria-label="Apple App"
                to="https://apps.apple.com/us/app/home-fix-technical/id6740774757"
                target="_blank"
              >
                <img src="/icons/appStore.svg" alt="" />
              </Link>
              <Link
                aria-label="Andorid App"
                to="https://play.google.com/store/apps/details?id=com.apps.homefixtechnical"
                target="_blank"
              >
                <img src="/icons/playStore.svg" alt="" />
              </Link>
            </div>
          </div>

          <div className="app_container">
            <h6 className="mb-3">{t("getApp.userApp")}</h6>
            <div className="btns">
              <Link
                aria-label="Apple App"
                to="https://apps.apple.com/us/app/home-fix/id6740774660"
                target="_blank"
              >
                <img src="/icons/appStore.svg" alt="" />
              </Link>
              <Link
                aria-label="Andorid App"
                to="https://play.google.com/store/apps/details?id=com.apps.homefix"
                target="_blank"
              >
                <img src="/icons/playStore.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
