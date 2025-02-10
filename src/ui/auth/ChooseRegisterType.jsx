import { useTranslation } from "react-i18next";

export default function ChooseRegisterType({ setFormType }) {
  const { t } = useTranslation();
  return (
    <>
      <img
        src="/images/auth.gif"
        alt="register-img"
        className="small-screen-img"
      />
      <div className="mb-3">
        <h2 className="head text-center">{t("auth.registerNewAccount")} </h2>
      </div>
      <div className="form">
        <div className="d-flex flex-column gap-2">
          <button
            onClick={() => setFormType("register")}
            className="personal-account"
          >
            <i className="fa-sharp fa-solid fa-user"></i>
            {t("auth.client")}
          </button>
          <button onClick={() => setFormType("register-technical")}>
            <i className="fa-solid fa-gears"></i>
            {t("auth.technical")}
          </button>
        </div>

        <span className="noAccount text-center">
          {t("auth.haveAccount")}{" "}
          <span className="haveAccount-comment">
            {t("auth.haveAccount-comment")}
          </span>
          <div>{t("auth.noAccount")} </div>
        </span>

        <div className="d-flex  gap-2">
          <button
            onClick={() => setFormType("login")}
            className="personal-account"
          >
            {t("auth.login")}
          </button>
          <button onClick={() => setFormType("forget")}>
            {t("auth.forgetPassword")}
          </button>
        </div>
      </div>
    </>
  );
}
