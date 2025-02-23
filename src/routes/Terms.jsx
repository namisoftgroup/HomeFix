import { useTranslation } from "react-i18next";
import useGetSettings from "../hooks/settings/useGetSettings";

const Terms = ({ type }) => {
  const { t } = useTranslation();
  const { data } = useGetSettings();

  return (
    <section className="terms_container container">
      <div className="terms_content ">
        <h2>
          {t(`${type === "privacy" ? "privacyPolicy" : "TermsConditions"}`)}
        </h2>
        <div
          dangerouslySetInnerHTML={{
            __html:
              type === "privacy"
                ? data?.privacy_policy_text
                : data?.terms_conditions_text,
          }}
        ></div>
      </div>
    </section>
  );
};

export default Terms;
