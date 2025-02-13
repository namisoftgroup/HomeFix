import { useState } from "react";
import { Modal, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ConfirmationModal({
  open,
  onClose,
  isAgreed,
  setIsAgreed,
}) {
  const { t } = useTranslation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose();
    setShowSuccessModal(true);
  };

  const handleSuccessConfirm = () => {
    navigate("/Orders");
  };

  return (
    <>
      <Modal show={open} onHide={onClose} centered className="confirm-delete">
        <Modal.Header closeButton>
          <Modal.Title>{t("termsAndConditions")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <p>{t("termsText")}</p>
          <Form.Check
            type="checkbox"
            label={t("agreeToTerms")}
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)}
            className="form-check"
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="confirm-btn"
            disabled={!isAgreed}
            onClick={handleConfirm}
          >
            {t("Services.confirm")}
          </button>
        </Modal.Footer>
      </Modal>
      {/* SuccessModal */}
      <Modal show={showSuccessModal} centered className="success-modal">
        <Modal.Body className="text-center">
          <Image
            src="/images/confirm.gif"
            alt="Success"
            className="success-img"
          />
          <p className="success-text">{t("requestSuccess")}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="confirm-btn" onClick={handleSuccessConfirm}>
            {t("Services.confirm")}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
