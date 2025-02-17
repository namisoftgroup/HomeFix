import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helper";
import { toast } from "sonner";
import PhoneInput from "../form-elements/PhoneInput";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function ForgetStepOne({
  setFormType,
  formData,
  setFormData,
  setStep,
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/send-code", {
        phone: formData.phone,
        country_code: formData.country_code,
        type: formData.type,
      });
      if (res.data.code === 200) {
        toast.success(res.data.message);
        setStep(2);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong, please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="head">{t("auth.resetPasswordTitle")} </h2>
        <p className="sub-head">{t("auth.resetPasswordSubtitle")}</p>
      </div>

      <PhoneInput
        label={t("auth.phone")}
        required
        type="number"
        id="phone"
        name="phone"
        placeholder={t("auth.phone")}
        value={formData.phone}
        countryCode={formData.country_code}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <div className="d-flex align-items-center gap-2 mt-2">
        <button
          aria-label="Back"
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setFormType("login");
          }}
        >
          <i className="fal fa-arrow-right"></i>
        </button>

        <SubmitButton name={t("auth.send")} loading={loading} />
      </div>
    </form>
  );
}
