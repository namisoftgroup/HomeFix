import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form-elements/SubmitButton";

export default function PaymentModal({
  show,
  setShow,
  paymentType,
  setPaymentType,
  loading,
  handlePayment,
}) {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("choosePaymentType")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form className="form" onSubmit={(e) => handlePayment(e)}>
          <div className="radios mb-2">
            <label htmlFor="cash">
              <input
                type="radio"
                name="payment"
                id="cash"
                value="cash"
                checked={paymentType === "cash"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              <span className={paymentType === "cash" ? "active" : ""}>
                {t("cash")}
              </span>
            </label>

            <label htmlFor="online">
              <input
                type="radio"
                name="payment"
                id="online"
                value="online"
                checked={paymentType === "online"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              <span className={paymentType === "online" ? "active" : ""}>
                {t("online")}
              </span>
            </label>
          </div>
          <SubmitButton
            loading={loading}
            name={t("confirmPayment")}
            className="cancelButton m-0"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
