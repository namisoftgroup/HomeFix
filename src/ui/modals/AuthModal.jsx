import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import Login from "../auth/Login";
import UserRegister from "../auth/UserRegister";
import RegisterTechnical from "../auth/RegisterTechnical";
import ForgetPassword from "../auth/ForgetPassword";
import ConfirmRegister from "../auth/ConfirmRegister";

export default function AuthModal() {
  const { show } = useSelector((state) => state.showAuthModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formType, setFormType] = useState("login");
  const [userType, setUserType] = useState("client");

  const [userRegisterData, setUserRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    city_id: "",
    country_code: "+962",
    type: userType,
  });

  const [technicalData, setTechnicalData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    city_id: "",
    country_code: "+962",
    specialty_id: "",
    image: null,
    front_national_image: null,
    back_national_image: null,
    type: userType,
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
                setFormData={setUserRegisterData}
                formData={userRegisterData}
              />
            )}

            {formType === "register-technical" && (
              <RegisterTechnical
                setFormType={setFormType}
                formData={technicalData}
                setFormData={setTechnicalData}
              />
            )}

            {formType === "confirm-register" && (
              <ConfirmRegister
                formData={
                  userType === "technical" ? technicalData : userRegisterData
                }
                setFormData={
                  userType === "technical"
                    ? setTechnicalData
                    : setUserRegisterData
                }
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
