import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helper";
import { toast } from "sonner";
import useGetCities from "../../hooks/user/useGetCities";
import axiosInstance from "../../utils/axiosInstance";
import PhoneInput from "../form-elements/PhoneInput";
import PasswordField from "../form-elements/PasswordField";
import SubmitButton from "../form-elements/SubmitButton";
import InputField from "../form-elements/InputField";
import SelectField from "../form-elements/SelectField";

function UserRegister({ setFormType, setShow, setFormData, formData }) {
  const { t } = useTranslation();
  const { data: cities, isLoading } = useGetCities();
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
        <InputField
          required
          label={t("auth.fullName")}
          placeholder={t("auth.fullName")}
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e, setFormData)}
        />

        <PhoneInput
          label={t("auth.phone")}
          required
          id="phone"
          name="phone"
          placeholder={t("auth.phone")}
          value={formData.phone}
          countryCode={formData.country_code}
          onChange={(e) => handleChange(e, setFormData)}
        />

        <InputField
          required
          label={t("auth.email")}
          placeholder={t("auth.email")}
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e, setFormData)}
        />

        <SelectField
          required
          loading={isLoading}
          loadingText={t("isLoading")}
          label={t("auth.city")}
          id="city_id"
          name="city_id"
          value={formData.city_id}
          onChange={(e) =>
            setFormData({ ...formData, city_id: e.target.value })
          }
          options={
            cities?.map((city) => ({ name: city.name, value: city.id })) || []
          }
        />

        <PasswordField
          label={t("auth.password")}
          placeholder={t("auth.password")}
          required
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e, setFormData)}
        />

        <span className="noAccount mt-2">
          {t("auth.byContinueYouAccept")}{" "}
          <Link to="/terms-and-conditions" onClick={() => setShow(false)}>
            {t("TermsConditions")}
          </Link>
        </span>

        <div className="d-flex gap-2">
          <button className="back_btn" onClick={() => setFormType("login")}>
            <i className="fal fa-arrow-right"></i>
          </button>
          <SubmitButton name={t("auth.send")} loading={loading} />
        </div>
      </form>
    </>
  );
}

export default UserRegister;
