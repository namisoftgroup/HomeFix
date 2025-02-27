import { useTranslation } from "react-i18next";
import InputField from "../form-elements/InputField";
import PasswordField from "../form-elements/PasswordField";
import PhoneInput from "../form-elements/PhoneInput";
import SelectField from "../form-elements/SelectField";
import useGetCities from "../../hooks/user/useGetCities";
import useGetCategory from "../../hooks/user/useGetCategory";

export default function TechnicalStepOne({
  errors,
  register,
  watch,
  setFormType,
  setStep,
  handleSubmit,
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
        {...register("name")}
        error={errors?.name?.message}
      />

      <PhoneInput
        label={t("auth.phone")}
        required
        id="phone"
        name="phone"
        placeholder={t("auth.phone")}
        countryCode={watch("country_code")}
        {...register("phone")}
        error={errors?.phone?.message}
      />

      <SelectField
        required
        loadingText={t("isLoading")}
        label={t("auth.city")}
        id="city_id"
        name="city_id"
        {...register("city_id")}
        error={errors?.city_id?.message}
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
        error={errors?.specialty_id?.message}
        {...register("specialty_id")}
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
        {...register("email")}
        error={errors?.email?.message}
      />

      <PasswordField
        label={t("auth.password")}
        placeholder={t("auth.password")}
        required
        id="password"
        name="password"
        {...register("password")}
        error={errors?.password?.message}
      />

      <div className="d-flex gap-2 mt-2">
        <button
          className="back_btn"
          type="button"
          onClick={() => setFormType("login")}
        >
          <i className="fal fa-arrow-right"></i>
        </button>

        <button type="button" onClick={handleSubmit(() => setStep(2))}>
          {t("auth.next")}
        </button>
      </div>
    </>
  );
}
