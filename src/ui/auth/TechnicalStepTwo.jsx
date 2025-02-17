import { useTranslation } from "react-i18next";
import ImageUpload from "../form-elements/ImageUpload";
import ImageUploadBox from "../form-elements/ImageUploadBox";
import SubmitButton from "../form-elements/SubmitButton";

export default function TechnicalStepTwo({
  formData,
  setFormData,
  loading,
  setStep,
}) {
  const { t } = useTranslation();

  return (
    <>
      <ImageUpload formData={formData} setFormData={setFormData} />

      <p className="upload-hint">{t("auth.UploadHint")}</p>

      <div className="form_group">
        <ImageUploadBox
          title={t("auth.imgIdTitle")}
          subtitle={t("auth.imgIdSubtitle1")}
          onChange={(e) => {
            const file = e.target.files[0];
            setFormData({ ...formData, front_national_image: file });
          }}
        />
      </div>

      <div className="form_group">
        <ImageUploadBox
          title={t("auth.imgIdTitle")}
          subtitle={t("auth.imgIdSubtitle2")}
          onChange={(e) => {
            const file = e.target.files[0];
            setFormData({ ...formData, back_national_image: file });
          }}
        />
      </div>

      <div className="d-flex gap-2 mt-2">
        <button type="button" className="back_btn" onClick={() => setStep(1)}>
          <i className="fal fa-arrow-right"></i>
        </button>
        <SubmitButton name={t("auth.send")} loading={loading} />
      </div>
    </>
  );
}
