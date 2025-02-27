import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useGetCities from "../../hooks/user/useGetCities";
import axiosInstance from "../../utils/axiosInstance";
import PhoneInput from "../form-elements/PhoneInput";
import PasswordField from "../form-elements/PasswordField";
import SubmitButton from "../form-elements/SubmitButton";
import InputField from "../form-elements/InputField";
import SelectField from "../form-elements/SelectField";

function UserRegister({
  setFormType,
  setShow,
  register,
  errors,
  watch,
  handleSubmit,
  isSubmitting,
  reset,
}) {
  const { t } = useTranslation();
  const { data: cities, isLoading } = useGetCities();

  const onSubmit = async () => {
    try {
      const res = await axiosInstance.post("/auth/send-code", {
        phone: watch("phone"),
        country_code: watch("country_code"),
        type: "register",
      });

      if (res.data.code === 200) {
        setFormType("confirm-register");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error Sending OTP:", error);
    }
  };

  return (
    <>
      <div className="mb-2">
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={t("auth.fullName")}
          placeholder={t("auth.fullName")}
          id="name"
          name="name"
          {...register("name")}
          error={errors.name?.message}
        />

        <PhoneInput
          label={t("auth.phone")}
          id="phone"
          name="phone"
          placeholder={t("auth.phone")}
          {...register("phone")}
          countryCode={watch("country_code")}
          error={errors.phone?.message}
        />

        <InputField
          label={t("auth.email")}
          placeholder={t("auth.email")}
          id="email"
          name="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <SelectField
          loading={isLoading}
          loadingText={t("isLoading")}
          label={t("auth.city")}
          id="city_id"
          name="city_id"
          {...register("city_id")}
          error={errors.city_id?.message}
          options={
            cities?.map((city) => ({ name: city.name, value: city.id })) || []
          }
        />

        <PasswordField
          label={t("auth.password")}
          placeholder={t("auth.password")}
          id="password"
          name="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <span className="noAccount mt-2">
          {t("auth.byContinueYouAccept")}{" "}
          <Link to="/terms-and-conditions" onClick={() => setShow(false)}>
            {t("TermsConditions")}
          </Link>
        </span>

        <div className="d-flex gap-2">
          <div
            className="back_btn"
            onClick={() => {
              setFormType("login");
              reset();
            }}
          >
            <i className="fal fa-arrow-right"></i>
          </div>
          <SubmitButton name={t("auth.send")} loading={isSubmitting} />
        </div>
      </form>
    </>
  );
}

export default UserRegister;
