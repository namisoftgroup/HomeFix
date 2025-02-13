import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AudioRecorder from "../../ui/form-elements/Record";
import ConfirmationModal from "../modals/ConfirmationModal";
// import MapSection from "../form-elements/Map";

export default function ServiceDetails() {
  const { t } = useTranslation();
  const location = useLocation();
  const service = location.state?.service || {};

  const [formData, setFormData] = useState({
    images: [],
    description: "",
    isScheduled: false,
    selectedTime: "",
    selectedDate: "",
    isAgreed: false,
    lat: 23.0000,
    lng: 46.0000,
  });

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmClick = () => {
    const validations = [
      {
        condition:
          formData.images.length === 0 ||
          formData.description.trim() === "" ||
          (formData.isScheduled &&
            (!formData.selectedTime || !formData.selectedDate)),
        message: t("Services.errormsg"),
      },
    ];

    const firstError = validations.find((v) => v.condition);

    if (firstError) {
      setErrorMessage(firstError.message);
      return;
    }

    setErrorMessage("");
    setShowModal(true);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="service-details container">
      <h2>{t("Services.serviceDetails")}</h2>
      <p>{service.title}</p>

      <div className="section">
        <label className="label-container">
          <img src="/icons/Frame1.svg" alt="icon" className="label-icon" />
          {t("Services.faultImages")}
        </label>
        <div className="image-upload">
          {formData.images.map((img, index) => (
            <div key={index} className="image-preview">
              <img src={img} alt={`upload-${index}`} />
              <button className="remove-btn" onClick={() => removeImage(index)}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          ))}
          <label className="upload-btn">
            <img src="/icons/uploadimg.svg" alt="" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      <div className="section">
        <label className="label-container">
          <img src="/icons/Fram3.svg" alt="icon" className="label-icon" />
          {t("Services.faultDescription")}
        </label>
        <textarea
          name="description"
          placeholder={t("Services.writeHere")}
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="section">
        <AudioRecorder />
      </div>

      <div className="section">
        <label>{t("Services.requestScheduledAppointment")}</label>
        <label className="toggle-switch">
          <input
            type="checkbox"
            name="isScheduled"
            checked={formData.isScheduled}
            onChange={handleChange}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* <div className="section">
        <MapSection formData={formData} setFormData={setFormData} />
      </div> */}

      {formData.isScheduled && (
        <div className="date-time-container">
          <input
            type="time"
            name="selectedTime"
            className="date-time-input"
            value={formData.selectedTime}
            onChange={handleChange}
          />
          <input
            type="date"
            name="selectedDate"
            className="date-time-input"
            value={formData.selectedDate}
            onChange={handleChange}
          />
        </div>
      )}

      <button className="confirm-btn" onClick={handleConfirmClick}>
        {t("Services.confirm")}
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <ConfirmationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
        isAgreed={formData.isAgreed}
        setIsAgreed={(value) =>
          setFormData((prev) => ({ ...prev, isAgreed: value }))
        }
        t={t}
      />
    </div>
  );
}
