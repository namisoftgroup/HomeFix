import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form-elements/SubmitButton";
import InputField from "../form-elements/InputField";
import React from "react";

export default function TechnicalRate({
  show,
  setShow,
  handleRate,
  loading,
  formData,
  setFormData,
}) {
  const { t } = useTranslation();

  const handleRatingChange = (value) => {
    setFormData({ ...formData, stars: value + 1 });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("rateTechnical")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form className="form" onSubmit={(e) => handleRate(e)}>
          <div className="star-rating-service">
            {Array.from({ length: 5 }).map((_, star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={formData.stars === star}
                  onChange={() => handleRatingChange(star)}
                />
                <label
                  htmlFor={`star${star}`}
                  title={`${star} stars`}
                  className={formData.stars >= star + 1 ? "active" : ""}
                >
                  <i className="fa-sharp fa-solid fa-star"></i>
                </label>
              </React.Fragment>
            ))}
          </div>

          <InputField
            as="textarea"
            placeholder={t("writeYourExperience")}
            name="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />

          <SubmitButton
            loading={loading}
            name={t("send")}
            className="cancelButton m-0"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
