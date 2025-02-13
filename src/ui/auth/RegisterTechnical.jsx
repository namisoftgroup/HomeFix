import { useState } from "react";
import { Link } from "react-router-dom";
import { handleChange} from "../../utils/helper";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import useGetCities from "../../hooks/user/useGetCities";
import useGetCategory from "../../hooks/user/useGetCategory.js";
import InputField from "../form-elements/InputField";
import SelectField from "../form-elements/SelectField";
import PasswordField from "../form-elements/PasswordField";
import SubmitButton from "../form-elements/SubmitButton";
import PhoneInput from "../form-elements/PhoneInput";
import ImageUpload from "../form-elements/ImageUpload";
import ImageUploadBox from "../form-elements/ImageUploadBox";

export default function RegisterTechnical({
  setShow,
  setFormType,
  userType,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token", "id"]);
  const [loading, setLoading] = useState(false);
  const { data: cities } = useGetCities();
  const { data: categories } = useGetCategory();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    city_id: "",
    country_code: "+962",
    type: userType === "technical" ? "provider" : "client",
    image: null,
    front_national_image: null,
    back_national_image: null,
    specialty_id: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const registerResponse = await axiosInstance.post(
        "/auth/users", 
        formDataToSend, 
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
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
      <div className="mb-1">
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <ImageUpload
          type="file"
          name="image"
          id="img-upload"
          accept="image/*"
          uploadOnly={true}
          formData={formData}
          setFormData={setFormData}
          onChange={(e) => {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
          }}
        />

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
        </div>

        <div className="form_group">
          <ImageUploadBox
            title={t("auth.imgIdTitle")}
            subtitle={t("auth.imgIdSubtitle1")}
            type="file"
            name="front_national_image"
            id="img-upload-front"
            accept="image/*"
            uploadOnly={true}
            formData={formData}
            setFormData={setFormData}
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData({ ...formData, front_national_image: file });
            }}
          />

          <ImageUploadBox
            title={t("auth.imgIdTitle")}
            subtitle={t("auth.imgIdSubtitle2")}
            type="file"
            name="back_national_image"
            id="img-upload-back"
            accept="image/*"
            uploadOnly={true}
            formData={formData}
            setFormData={setFormData}
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData({ ...formData, back_national_image: file });
            }}
          />
        </div>
        <p className="upload-hint">{t("auth.UploadHint")}</p>
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
            loadingText={t("isLoading")}
            label={t("auth.city")}
            id="city_id"
            name="city_id"
            value={formData.city_id}
            onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
            options={cities?.map((city) => ({ name: city.name, value: city.id })) || []}
          />
          <SelectField
            required
            loadingText={t("isLoading")}
            label={t("auth.category")}
            id="specialty_id"
            name="specialty_id"
            value={formData.specialty_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                specialty_id: e.target.value,
              })
            }
            options={categories?.map((category) => ({ name: category.title, value: category.id })) || []}
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

          <PasswordField
            label={t("auth.passwordConfirmation")}
            placeholder={t("auth.passwordConfirmation")}
            required
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>

        <span className="noAccount mt-2">
          {t("auth.byContinueYouAccept")}{" "}
          <Link
            aria-label="Terms and Conditions"
            to="/terms-and-conditions"
            onClick={() => setShow(false)}
          >
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