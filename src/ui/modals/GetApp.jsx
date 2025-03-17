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
        <h4 className="modalTitle">
          {t("getApp.title")} <span> {t("appName")} </span>
        </h4>
        <h6 className="subtitle"> {t("getApp.subtitle")} </h6>
        <img className="qrcode" src="/icons/qr.png" alt="" />
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
            to="https://play.google.com/store/apps/details?id=com.apps.homefix"
            target="_blank"
          >
            <img src="/icons/playStore.svg" alt="" />
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
