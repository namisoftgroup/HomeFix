import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AudioRecorder from "../../ui/form-elements/Record";
import ConfirmationModal from "../modals/ConfirmationModal";
import useGetServices from "../../hooks/home/useGetServices";
import SubmitButton from "../form-elements/SubmitButton";
import MapSection from "./MapSection";

export default function ServiceDetails() {
  const { t } = useTranslation();
  const { data: services } = useGetServices();
  const [service, setService] = useState();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    images: [],
    description: "",
    isScheduled: false,
    selectedTime: "",
    selectedDate: "",
    isAgreed: false,
    lat: 23.0,
    lng: 46.0,
  });

  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (!id) {
      navigate("/");
    }

    if (services) {
      setService(services?.filter((s) => s?.id === +id)[0]);
    }
  }, [id, navigate, services]);

  return (
    <div className="service-details">
      <div className="container">
        <form className="row justify-content-center">
          <div className="col-lg-10 p-2 mb-3">
            <div className="service_details_card">
              <div className="img">
                <img src={service?.image} alt={service?.title} />
              </div>
              <div className="content">
                <h2>{service?.title}</h2>
                <p>{service?.description}</p>
                <ul>
                  <li>
                    <img src="/images/technical.svg" alt="technical" />
                    <h6>
                      {t("availableTechnicans")} {service?.technicals_count}
                    </h6>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-10 p-2 mb-3">
            <div className="section">
              <label className="label-container">
                <img
                  src="/icons/Frame1.svg"
                  alt="icon"
                  className="label-icon"
                />
                {t("Services.faultImages")}
              </label>

              <div className="image-upload">
                <label className="upload-btn">
                  <img src="/icons/uploadimg.svg" alt="" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>

                {formData.images.map((img, index) => (
                  <div key={index} className="image-preview">
                    <img src={img} alt={`upload-${index}`} />
                    <button
                      className="remove-btn"
                      onClick={() => removeImage(index)}
                    >
                      <span>
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-10 p-2 mb-3">
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
          </div>

          <div className="col-lg-10 p-2 mb-3">
            <MapSection />
          </div>

          <div className="col-lg-10 p-2 mb-3">
            <div className="section">
              <AudioRecorder />
            </div>
          </div>

          <div className="col-lg-10 p-2">
            <div className="section flex-row justify-content-between">
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
          </div>

          {formData.isScheduled && (
            <div className="col-lg-10 p-2 mb-2">
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
            </div>
          )}

          <div className="col-lg-10 p-2">
            <SubmitButton
              className="confirm-btn"
              name={t("Services.confirm")}
            />
          </div>
        </form>
      </div>

      <ConfirmationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
        isAgreed={formData.isAgreed}
        setIsAgreed={(value) =>
          setFormData((prev) => ({ ...prev, isAgreed: value }))
        }
      />
    </div>
  );
}
