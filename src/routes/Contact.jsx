import ContactForm from "../ui/Home/ContactForm";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-5 col-12 p-2">
          <h2 className="contact-title">{t("contactTitle")}</h2>
          <p className="contact-text">{t("contactText")}</p>
          <div className="contant_img">
            <img src="/images/contactform.png" alt="contactus" />
          </div>
        </div>
        <div className="col-lg-7 col-12 p-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
