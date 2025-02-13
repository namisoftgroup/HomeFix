import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import Login from "../auth/Login";
import UserRegister from "../auth/UserRegister";
import RegisterTechnical from "../auth/RegisterTechnical";
import ForgetPassword from "../auth/ForgetPassword";

export default function AuthModal() {
  const { show } = useSelector((state) => state.showAuthModal);
  const dispatch = useDispatch();

  const [formType, setFormType] = useState("login");
  const [userType, setUserType] = useState("client");

  const [forgetFormData, setForgetFormData] = useState({
    phone: "",
    country_code: "962",
  });

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    username: "",
    country_code: "962",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    city_id: "",
    fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
  });

  const [FormData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    city_id: "",
    category_id: "",
    country_code: "962",
    password: "",
    password_confirmation: "",
    fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
  });

  return (
    <Modal
      centered
      show={show}
      className="authModal"
      backdrop="static"
      size="xl"
      onHide={() => dispatch(setShowAuthModal(false))}
    >
      <Modal.Body>
        <button
          aria-label="Close modal"
          className="closeModal"
          onClick={() => dispatch(setShowAuthModal(false))}
        >
          <i className="fa-regular fa-x"></i>
        </button>

        <section className="auth_section">
          <div className={`img_wrapper ${formType}`}>
            <img
              loading="lazy"
              className="bg-img"
              alt="auth-banner"
              src="/images/auth.gif"
            />
          </div>

          <div className={`form_wrapper ${formType}`}>
            {formType === "login" && (
              <Login
                setFormType={setFormType}
                userType={userType}
                setUserType={setUserType}
              />
            )}

            {formType === "register" && (
              <UserRegister
                setShow={() => dispatch(setShowAuthModal(false))}
                setFormType={setFormType}
                formData={registerFormData}
                setFormData={setRegisterFormData}
              />
            )}

            {formType === "register-technical" && (
              <RegisterTechnical
                setShow={() => dispatch(setShowAuthModal(false))}
                setFormType={setFormType}
                formData={FormData}
                setFormData={setFormData}
              />
            )}

            {formType === "forget" && (
              <ForgetPassword
                setShow={() => dispatch(setShowAuthModal(false))}
                setFormType={setFormType}
                formData={forgetFormData}
                setFormData={setForgetFormData}
              />
            )}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
