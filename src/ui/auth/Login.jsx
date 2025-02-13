import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helper";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import axiosInstance from "../../utils/axiosInstance";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PhoneInput from "../../ui/form-elements/PhoneInput";

function Login({ setFormType, userType, setUserType }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [, setCookie] = useCookies(["token", "id"]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    country_code: "+962",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", {
        ...formData,
        type: userType,
      });

      if (res.data.code === 200) {
        const res = await axiosInstance.post("/auth/login", {
          ...formData,
          type: userType,
        });

        setCookie("token", res.data?.data?.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        setCookie("id", res.data?.data?.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        toast.success("Login successful!");
        dispatch(setShowAuthModal(false));
        localStorage.setItem("userType", userType);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="head">
          {t("auth.loginTitle")} <span>{t("HomeFix")}</span>
        </h2>
        <p className="sub-head">{t("auth.loginSubtitle")}</p>
      </div>
      <div className="input-field mb-4">
        <div className="radios">
          <label htmlFor="client">
            <input
              type="radio"
              name="userState"
              id="client"
              value="client"
              checked={userType === "client"}
              onChange={(e) => setUserType(e.target.value)}
            />
            <span className={`${userType === "client" ? "active" : ""}`}>
              {t("auth.client")}
            </span>
          </label>

          <label htmlFor="technical">
            <input
              type="radio"
              name="userState"
              id="technical"
              value="technical"
              checked={userType === "technical"}
              onChange={(e) => setUserType(e.target.value)}
            />
            <span className={`${userType === "technical" ? "active" : ""}`}>
              {t("auth.technical")}
            </span>
          </label>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <PhoneInput
          label={t("auth.phone")}
          required
          type="number"
          id="phone"
          name="phone"
          placeholder={t("auth.phone")}
          value={formData.phone}
          countryCode={formData.country_code}
          onChange={(e) => handleChange(e, setFormData)}
        />
        <PasswordField
          label={t("auth.password")}
          placeholder={t("auth.password")}
          required
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e, setFormData)}
        />
        <span
          className="forgetpass"
          style={{ cursor: "pointer" }}
          onClick={() => setFormType("forget")}
        >
          {t("auth.forgetPassword")}
        </span>

        <SubmitButton name={t("auth.login")} loading={loading} />
        <p className="noAccount">
          {t("auth.dontHaveAccount")}{" "}
          <span
            onClick={() =>
              setFormType(
                userType === "client" ? "register" : "register-technical"
              )
            }
          >
            {t("auth.createAccount")}
          </span>
        </p>
      </form>
    </>
  );
}

export default Login;
