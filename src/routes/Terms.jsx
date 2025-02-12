import { useTranslation } from "react-i18next";

const Terms = () => {
  const { t } = useTranslation();

  return (
    <section className="terms_container container">
      <div className="terms_content ">
        <h2>{t("TermsConditions")}</h2>
        <p>{t("termsText")}</p>
      
      </div>
    </section>
  );
};

export default Terms;
