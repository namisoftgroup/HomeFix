import { useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ForgetStepOne from "./ForgetStepOne";
import ForgetStepTwo from "./ForgetStepTwo";
import ForgetStepThree from "./ForgetStepThree";
import * as yup from "yup";

function ForgetPassword({ setFormType }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const stepOneSchema = yup.object().shape({
    phone: yup
      .string()
      .required(t("validation.phoneRequired"))
      .matches(/^0|7\d{8}$/, t("validation.phoneInvalid")),
  });

  const stepThreeSchema = yup.object().shape({
    new_password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength"))
      .matches(/[A-Z]/, t("validation.passwordCapitalLetter"))
      .matches(/[a-z]/, t("validation.passwordSmallLetter")),
    confirm_password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .oneOf([yup.ref("new_password")], t("validation.passwordNotMatch")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(step === 1 ? stepOneSchema : stepThreeSchema),

    defaultValues: {
      phone: "",
      type: "reset",
      country_code: "+962",
      new_password: "",
      confirm_password: "",
    },
  });

  return (
    <>
      {step === 1 && (
        <ForgetStepOne
          setStep={setStep}
          setFormType={setFormType}
          register={register}
          errors={errors}
          watch={watch}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {step === 2 && (
        <ForgetStepTwo
          setStep={setStep}
          watch={watch}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {step === 3 && (
        <ForgetStepThree
          setFormType={setFormType}
          register={register}
          errors={errors}
          watch={watch}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}

export default ForgetPassword;
