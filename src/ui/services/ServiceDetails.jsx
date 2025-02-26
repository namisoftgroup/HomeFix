import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AudioRecorder from "../../ui/form-elements/Record";
import ConfirmationModal from "../modals/ConfirmationModal";
import useGetServices from "../../hooks/home/useGetServices";
import SubmitButton from "../form-elements/SubmitButton";
import MapSection from "./MapSection";
import axiosInstance from "../../utils/axiosInstance";

export default function ServiceDetails() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: services } = useGetServices();
  const { client } = useSelector((state) => state.clientData);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [service, setService] = useState();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    service_id: +id,
    address: "XW8P+V9 Amman, Jordan",
    latitude: 31.9632,
    longitude: 35.9304,
    description: "",
    images_list: [],
    voice: null,
    is_schedule: 0,
    schedule_date: "",
    schedule_time: "",
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const objects = files.map((file) => ({ file: file }));
    setFormData((prev) => ({
      ...prev,
      images_list: [...prev.images_list, ...objects],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images_list: prev.images_list.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  useEffect(() => {
    if (!id || client?.type !== "client") {
      navigate("/");
    }

    if (services) {
      setService(services?.filter((s) => s?.id === +id)[0]);
    }
  }, [client?.type, id, navigate, services]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      service_id: formData.service_id,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      description: formData.description,
      images_list: formData.images_list,
      voice: formData.voice,
      is_schedule: formData.is_schedule,
    };

    if (formData.is_schedule === 1) {
      payload.schedule_date = formData.schedule_date;
      payload.schedule_time = formData.schedule_time;
    }

    try {
      const res = await axiosInstance.post("/homefix/orders-client", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.code === 200) {
        toast.success(res.data.message);
        navigate("/my-orders");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || t("someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-details">
      <div className="container">
        <form className="row justify-content-center" onSubmit={handleSubmit}>
          {/* service card */}
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

          {/* images field */}
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

                {formData.images_list.map((obj, index) => (
                  <div key={index} className="image-preview">
                    <img
                      src={URL.createObjectURL(obj.file)}
                      alt={`upload-${index}`}
                    />
                    <div
                      className="remove-btn"
                      onClick={() => removeImage(index)}
                    >
                      <span>
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* description field */}
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

          {/* map field */}
          <div className="col-lg-10 p-2 mb-3">
            <MapSection formData={formData} setFormData={setFormData} />
          </div>

          {/* audio field */}
          <div className="col-lg-10 p-2 mb-3">
            <AudioRecorder setFormData={setFormData} />
          </div>

          {/* schedule field */}
          <div className="col-lg-10 p-2">
            <div className="section flex-row justify-content-between">
              <label>{t("Services.requestScheduledAppointment")}</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="is_schedule"
                  checked={formData.is_schedule === 1}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {formData.is_schedule ? (
            <div className="col-lg-10 p-2 mb-2">
              <div className="date-time-container">
                <input
                  type="time"
                  name="schedule_time"
                  required
                  className="date-time-input"
                  value={formData.schedule_time}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="schedule_date"
                  required
                  className="date-time-input"
                  value={formData.schedule_date}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : null}

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
        isAgreed={isAgree}
        loading={loading}
        setIsAgreed={setIsAgree}
        handleConfirm={handleConfirm}
      />
    </div>
  );
}
