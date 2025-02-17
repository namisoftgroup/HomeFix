import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helper";
import InputField from "../form-elements/InputField";
import PasswordField from "../form-elements/PasswordField";
import PhoneInput from "../form-elements/PhoneInput";
import SelectField from "../form-elements/SelectField";
import useGetCities from "../../hooks/user/useGetCities";
import useGetCategory from "../../hooks/user/useGetCategory";

export default function TechnicalStepOne({
  formData,
  setFormData,
  setFormType,
  setStep,
}) {
  const { t } = useTranslation();
  const { data: cities } = useGetCities();
  const { data: categories } = useGetCategory();

  return (
    <>
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

      <SelectField
        required
        loadingText={t("isLoading")}
        label={t("auth.city")}
        id="city_id"
        name="city_id"
        value={formData.city_id}
        onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
        options={
          cities?.map((city) => ({ name: city.name, value: city.id })) || []
        }
      />

      <SelectField
        required
        loadingText={t("isLoading")}
        label={t("auth.category")}
        id="specialty_id"
        name="specialty_id"
        value={formData.specialty_id}
        onChange={(e) =>
          setFormData({
            ...formData,
            specialty_id: e.target.value,
          })
        }
        options={
          categories?.map((category) => ({
            name: category.title,
            value: category.id,
          })) || []
        }
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

      <PasswordField
        label={t("auth.password")}
        placeholder={t("auth.password")}
        required
        id="password"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <div className="d-flex gap-2 mt-2">
        <button
          className="back_btn"
          type="button"
          onClick={() => setFormType("login")}
        >
          <i className="fal fa-arrow-right"></i>
        </button>

        <button type="button" onClick={() => setStep(2)}>
          {t("auth.next")}
        </button>
      </div>
    </>
  );
}
