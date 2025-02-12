import { useTranslation } from "react-i18next";

const Terms = () => {
  const { t } = useTranslation();

  return (
    <section className="about_container container">
      <div className="about_content ">
        <h2>{t("aboutus")}</h2>
        <p>{t("about us")}</p>
      
      </div>
    </section>
  );
};

export default Terms;
