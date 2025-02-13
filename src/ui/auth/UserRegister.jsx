import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helper";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import useGetCities from "../../hooks/user/useGetCities";
import axiosInstance from "../../utils/axiosInstance";
import PhoneInput from "../form-elements/PhoneInput";
import PasswordField from "../form-elements/PasswordField";
import SubmitButton from "../form-elements/SubmitButton";
import InputField from "../form-elements/InputField";
import SelectField from "../form-elements/SelectField";

function UserRegister({ setFormType, userType, setShow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token", "id"]);
  const [loading, setLoading] = useState(false);
  const { data: cities, isLoading } = useGetCities(); 
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    city_id: "",
    country_code: "+962",
    type: userType === "technical" ? "provider" : "client",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registerResponse = await axiosInstance.post(
        "/auth/users",
        formData,
      );

      if (registerResponse.data.code === 200) {
        const loginPayload = {
          phone: formData.phone,
          password: formData.password,
          type: formData.type,
          country_code: formData.country_code,
        };

        const loginResponse = await axiosInstance.post(
          "/auth/login",
          loginPayload
        );

        if (loginResponse.data.code === 200) {
          setCookie("token", loginResponse.data?.data?.token, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });

          setCookie("id", loginResponse.data?.data?.id, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });

          toast.success(loginResponse.data.message);
          dispatch(setShowAuthModal(false));
          localStorage.setItem("userType", userType);
        } else {
          toast.error(loginResponse.data.message);
        }
      } else {
        toast.error(registerResponse.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Signup or login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form_group">
          <InputField
            required
            label={t("auth.fullName")}
            placeholder={t("auth.fullName")}
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
          />
          <InputField
            required
            label={t("auth.email")}
            placeholder={t("auth.email")}
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="form_group">
        <SelectField
          required
          loading={isLoading}
          loadingText={t("isLoading")}
          label={t("auth.city")}
          id="city_id"
          name="city_id"
          value={formData.city_id}
          onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
          options={cities?.map((city) => ({ name: city.name, value: city.id })) || []}
        />
        </div>
        <div className="form_group">
          <PhoneInput
            label={t("auth.phone")}
            required
            id="phone"
            name="phone"
            placeholder={t("auth.phone")}
            value={formData.phone}
            countryCode={formData.country_code}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>

        <div className="form_group">
          <PasswordField
            label={t("auth.password")}
            placeholder={t("auth.password")}
            required
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>

        <span className="noAccount mt-2">
          {t("auth.byContinueYouAccept")}{" "}
          <Link to="/terms-and-conditions" onClick={() => setShow(false)}>
            {t("TermsConditions")}
          </Link>
        </span>

        <div className="d-flex gap-2">
          <button className="back_btn" onClick={() => setFormType("login")}>
            <i className="fal fa-arrow-right"></i>
          </button>
          <SubmitButton name={t("auth.register")} loading={loading} />
        </div>
      </form>
    </>
  );
}

export default UserRegister;
