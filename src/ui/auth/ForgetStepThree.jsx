import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form-elements/SubmitButton";
import PasswordField from "../form-elements/PasswordField";
import axiosInstance from "../../utils/axiosInstance";

export default function ForgetStepThree({
  setFormType,
  watch,
  handleSubmit,
  register,
  errors,
  isSubmitting,
}) {
  const { t } = useTranslation();

  const onSubmit = async () => {
    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        phone: watch("phone").startsWith("0") ? watch("phone")?.slice(1) : watch("phone"),
        new_password: watch("new_password"),
        confirm_password: watch("confirm_password"),
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
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        label={t("auth.new_password")}
        placeholder={t("auth.new_password")}
        id="new_password"
        error={errors.new_password?.message}
        {...register("new_password")}
      />

      <PasswordField
        label={t("auth.confirm_password")}
        placeholder={t("auth.confirm_password")}
        id="confirm_password"
        error={errors.confirm_password?.message}
        {...register("confirm_password")}
      />

      <div className="d-flex align-items-center gap-2 mt-2">
        <SubmitButton name={t("auth.send")} loading={isSubmitting} />
      </div>
    </form>
  );
}
