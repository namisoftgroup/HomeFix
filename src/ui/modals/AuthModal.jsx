import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import * as yup from "yup";
import Login from "../auth/Login";
import UserRegister from "../auth/UserRegister";
import RegisterTechnical from "../auth/RegisterTechnical";
import ForgetPassword from "../auth/ForgetPassword";
import ConfirmRegister from "../auth/ConfirmRegister";

export default function AuthModal() {
  const { show } = useSelector((state) => state.showAuthModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formType, setFormType] = useState("login");
  const [userType, setUserType] = useState("client");

  const registerSchema = yup.object().shape({
    name: yup.string().required(t("validation.nameRequired")),
    phone: yup
      .string()
      .required(t("validation.phoneRequired"))
      .matches(/^7\d{8}$/, t("validation.phoneInvalid")),
    email: yup
      .string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength"))
      .matches(/[A-Z]/, t("validation.passwordCapitalLetter"))
      .matches(/[a-z]/, t("validation.passwordSmallLetter")),
    city_id: yup.string().required(t("validation.cityRequired")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),

    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      city_id: "",
      country_code: "+962",
      type: userType,
      specialty_id: "",
      image: null,
      front_national_image: null,
      back_national_image: null,
    },
  });

  return (
    <Modal centered show={show} className="authModal" backdrop="static">
      <Modal.Body>
        <button
          aria-label="Close modal"
          className="closeModal"
          onClick={() => {
            dispatch(setShowAuthModal(false));
            navigate("/");
          }}
        >
          <i className="fa-regular fa-x"></i>
        </button>

        <section className="auth_section">
          <div className={`form_wrapper ${formType}`}>
            {formType === "login" && (
              <Login
                userType={userType}
                setFormType={setFormType}
                setUserType={setUserType}
              />
            )}

            {formType === "register" && (
              <UserRegister
                setFormType={setFormType}
                setShow={() => dispatch(setShowAuthModal(false))}
                register={register}
                errors={errors}
                watch={watch}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            {formType === "register-technical" && (
              <RegisterTechnical
                setFormType={setFormType}
                register={register}
                errors={errors}
                watch={watch}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            {formType === "confirm-register" && (
              <ConfirmRegister
                data={{
                  name: watch("name"),
                  phone: watch("phone"),
                  email: watch("email"),
                  password: watch("password"),
                  city_id: watch("city_id"),
                  country_code: watch("country_code"),
                  type: watch("type"),
                }}
                watch={watch}
                userType={userType}
                setFormType={setFormType}
              />
            )}

            {formType === "forget" && (
              <ForgetPassword setFormType={setFormType} />
            )}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
