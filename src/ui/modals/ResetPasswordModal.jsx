import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export default function ResetPasswordModal({ show, setShow }) {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength"))
      .matches(/[A-Z]/, t("validation.passwordCapitalLetter"))
      .matches(/[a-z]/, t("validation.passwordSmallLetter")),
    password_confirmation: yup
      .string()
      .required(t("validation.passwordRequired"))
      .oneOf([yup.ref("password")], t("validation.passwordNotMatch")),
    current_password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength"))
      .matches(/[A-Z]/, t("validation.passwordCapitalLetter"))
      .matches(/[a-z]/, t("validation.passwordSmallLetter")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async () => {
    try {
      const res = await axiosInstance.post(`/auth/update-password`, {
        new_password: watch("password"),
        old_password: watch("current_password"),
      });

      if (res.data.code === 200) {
        toast.success(res.data.message);
        setShow(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong, please try again or contact us.");
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("resetPassword")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body profile-container p-3">
        <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label={t("auth.current_password")}
            name="current_password"
            type="password"
            {...register("current_password")}
            error={errors?.current_password?.message}
            icon="/icons/password.svg"
          />

          <InputField
            label={t("auth.new_password")}
            name="password"
            type="password"
            {...register("password")}
            error={errors?.password?.message}
            icon="/icons/password.svg"
          />

          <InputField
            label={t("auth.confirm_password")}
            name="confirmPassword"
            type="password"
            {...register("password_confirmation")}
            error={errors?.password_confirmation?.message}
            icon="/icons/password.svg"
          />

          <SubmitButton
            name={t("auth.confirm")}
            loading={isSubmitting}
            className="cancelButton mt-3"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
