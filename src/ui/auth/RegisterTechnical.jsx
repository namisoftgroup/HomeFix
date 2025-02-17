import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";
import TechnicalStepOne from "./TechnicalStepOne.jsx";
import TechnicalStepTwo from "./TechnicalStepTwo.jsx";

export default function RegisterTechnical({
  setFormType,
  formData,
  setFormData,
}) {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/send-code", {
        phone: formData.phone,
        country_code: formData.country_code,
        type: "register",
      });

      if (res.data.code === 200) {
        setFormType("confirm-register");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error Sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-2">
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {step === 1 ? (
          <TechnicalStepOne
            formData={formData}
            setFormData={setFormData}
            setFormType={setFormType}
            setStep={setStep}
          />
        ) : (
          <TechnicalStepTwo
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            setStep={setStep}
          />
        )}
      </form>
    </>
  );
}
