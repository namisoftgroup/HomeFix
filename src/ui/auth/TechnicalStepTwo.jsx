import { useTranslation } from "react-i18next";
import ImageUploadBox from "../form-elements/ImageUploadBox";
import SubmitButton from "../form-elements/SubmitButton";
import ImageUpload from "../form-elements/ImageUpload";

export default function TechnicalStepTwo({
  loading,
  setStep,
  errors,
  register,
  watch,
}) {
  const { t } = useTranslation();

  return (
    <>
      <ImageUpload
        register={register}
        error={errors?.image?.message}
        watch={watch}
      />

      <div className="form_group">
        <ImageUploadBox
          title={t("auth.imgIdTitle")}
          id="front_national_image"
          subtitle={t("auth.imgIdSubtitle1")}
          watch={watch}
          register={register}
          error={errors?.front_national_image?.message}
        />
      </div>

      <div className="form_group">
        <ImageUploadBox
          watch={watch}
          title={t("auth.imgIdTitle")}
          id="back_national_image"
          subtitle={t("auth.imgIdSubtitle2")}
          register={register}
          error={errors?.back_national_image?.message}
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
