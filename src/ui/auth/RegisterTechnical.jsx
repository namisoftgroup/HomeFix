import { useState } from "react";
import { Link } from "react-router-dom";
import { handleChange, handleChangeUserName } from "../../utils/helper";
import { useTranslation } from "react-i18next";
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
  formData,
  setFormData,
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  return (
    <>
      <div className="mb-1">
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <ImageUpload
          type="file"
          name="userImage"
          id="img-upload"
          accept="image/*"
          uploadOnly={true}
          formData={formData}
          setFormData={setFormData}
        />

        <div className="form_group">
          <InputField
            required
            label={t("auth.userName")}
            placeholder={t("auth.userNamePlaceHolder")}
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) => handleChangeUserName(e, setFormData)}
          />
        </div>

        <div className="form_group">
          <ImageUploadBox
            title={t("auth.imgIdTitle")}
            subtitle={t("auth.imgIdSubtitle1")}
            type="file"
            name="userImageFront"
            id="img-upload-front"
            accept="image/*"
            uploadOnly={true}
            formData={formData}
            setFormData={setFormData}
          />

          <ImageUploadBox
            title={t("auth.imgIdTitle")}
            subtitle={t("auth.imgIdSubtitle2")}
            type="file"
            name="userImageBack"
            id="img-upload-back"
            accept="image/*"
            uploadOnly={true}
            formData={formData}
            setFormData={setFormData}
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
            onChange={(e) =>
              setFormData({
                ...formData,
                city_id: e.target.value,
                state_id: "",
              })
            }
            options={[
              { name: "Cairo", value: "1" },
              { name: "Alexandria", value: "2" },
              { name: "Giza", value: "3" },
            ]}
          />

          <SelectField
            required
            loadingText={t("isLoading")}
            label={t("auth.category")}
            id="category_id"
            name="category_id"
            value={formData.state_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                state_id: e.target.value,
              })
            }
            options={[
              { name: "خدمات السباكه ", value: "1" },
              { name: "خدمات الصيانه ", value: "2" },
              { name: "خدمات الكهرباء", value: "3" },
            ]}
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
