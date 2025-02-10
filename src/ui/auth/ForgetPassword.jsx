import { useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "../../ui/form-elements/PhoneInput";
import SubmitButton from "../../ui/form-elements/SubmitButton";

function ForgetPassword({ setFormType, formData, setFormData }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  return (
    <form className="form">
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
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, phone: e.target.value }))
        }
        onSelect={(code, setShow) => {
          setFormData((prev) => ({ ...prev, country_code: code }));
          setShow(false);
        }}
      />

      <div className="d-flex align-items-center gap-2">
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

export default ForgetPassword;
