import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form-elements/SubmitButton";
import InputField from "../form-elements/InputField";

export default function CancelOrder({
  show,
  setShow,
  handleSubmit,
  loading,
  setCancelReason,
  cancelReason,
}) {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("cancelOrder")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form className="form" onSubmit={handleSubmit}>
          <InputField
            as="textarea"
            placeholder={t("cancelReason")}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />

          <SubmitButton
            name={t("confirmCancel")}
            disabled={!cancelReason}
            loading={loading}
            className="cancelButton m-0"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
