import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helper";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
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
    type: userType,
  });

  useEffect(() => {
    setFormData({ ...formData, type: userType });
  }, [formData, userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", formData);

      if (res.data.code === 200) {
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

        toast.success(res.data.message);
        dispatch(setShowAuthModal(false));
        localStorage.setItem("userType", userType);
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

          <label htmlFor="provider">
            <input
              type="radio"
              name="userState"
              id="provider"
              value="provider"
              checked={userType === "provider"}
              onChange={(e) => setUserType(e.target.value)}
            />
            <span className={`${userType === "provider" ? "active" : ""}`}>
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
