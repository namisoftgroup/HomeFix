import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";
import TechnicalStepOne from "./TechnicalStepOne.jsx";
import TechnicalStepTwo from "./TechnicalStepTwo.jsx";

export default function RegisterTechnical({
  setFormType,
  watch,
  register,
  errors,
  handleSubmit,
  isSubmitting,
  step,
  setStep,
  reset
}) {
  const { t } = useTranslation();

  const onSubmit = async () => {
    try {
      const res = await axiosInstance.post("/auth/send-code", {
        phone: watch("phone").startsWith("0") ? watch("phone")?.slice(1) : watch("phone"),
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
        {step === 1 ? (
          <TechnicalStepOne
            setFormType={setFormType}
            setStep={setStep}
            register={register}
            errors={errors}
            watch={watch}
            reset={reset}
            handleSubmit={handleSubmit}
          />
        ) : (
          <TechnicalStepTwo
            loading={isSubmitting}
            setStep={setStep}
            register={register}
            errors={errors}
            watch={watch}
            handleSubmit={handleSubmit}
          />
        )}
      </form>
    </>
  );
}
