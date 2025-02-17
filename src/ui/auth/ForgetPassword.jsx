import { useState } from "react";
import ForgetStepOne from "./ForgetStepOne";
import ForgetStepTwo from "./ForgetStepTwo";
import ForgetStepThree from "./ForgetStepThree";

function ForgetPassword({ setFormType }) {
  const [formData, setFormData] = useState({
    phone: "",
    type: "reset",
    country_code: "+962",
    new_password: "",
    confirm_password: "",
  });
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && (
        <ForgetStepOne
          setStep={setStep}
          formData={formData}
          setFormType={setFormType}
          setFormData={setFormData}
        />
      )}

      {step === 2 && (
        <ForgetStepTwo
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {step === 3 && (
        <ForgetStepThree
          setFormType={setFormType}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
}

export default ForgetPassword;
