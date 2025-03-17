import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import PhoneInput from "../form-elements/PhoneInput";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function ForgetStepOne({
  setFormType,
  setStep,
  register,
  errors,
  watch,
  handleSubmit,
  isSubmitting,
}) {
  const { t } = useTranslation();

  const onSubmit = async () => {
    try {
      const res = await axiosInstance.post("/auth/send-code", {
        phone: watch("phone").startsWith("0") ? watch("phone")?.slice(1) : watch("phone"),
        country_code: watch("country_code"),
        type: watch("type"),
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
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <h2 className="head">{t("auth.resetPasswordTitle")} </h2>
        <p className="sub-head">{t("auth.resetPasswordSubtitle")}</p>
      </div>

      <PhoneInput
        label={t("auth.phone")}
        placeholder={t("auth.phone")}
        id="phone"
        countryCode={watch("country_code")}
        error={errors.phone?.message}
        {...register("phone")}
      />

      <div className="d-flex align-items-center gap-2 mt-2">
        <div
          aria-label="Back"
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setFormType("login");
          }}
        >
          <i className="fal fa-arrow-right"></i>
        </div>

        <SubmitButton name={t("auth.send")} loading={isSubmitting} />
      </div>
    </form>
  );
}
