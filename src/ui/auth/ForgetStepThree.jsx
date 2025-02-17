import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helper";
import SubmitButton from "../form-elements/SubmitButton";
import PasswordField from "../form-elements/PasswordField";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";

export default function ForgetStepThree({ formData, setFormData, setFormType }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        phone: formData.phone,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      });
      if (res.data.code === 200) {
        toast.success(res.data.message);
        setFormType("login");
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
      <PasswordField
        label={t("auth.new_password")}
        placeholder={t("auth.new_password")}
        required
        id="new_password"
        name="new_password"
        value={formData.new_password}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <PasswordField
        label={t("auth.confirm_password")}
        placeholder={t("auth.confirm_password")}
        required
        id="confirm_password"
        name="confirm_password"
        value={formData.confirm_password}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <div className="d-flex align-items-center gap-2 mt-2">
        <SubmitButton name={t("auth.send")} loading={loading} />
      </div>
    </form>
  );
}
