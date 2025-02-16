import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import InputField from ".././form-elements/InputField";
import SubmitButton from ".././form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

const ContactForm = ({ image = "/images/contactform.png" }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "name", label: t("auth.name"), type: "text", icon: "user" },
    { name: "email", label: t("auth.email"), type: "email", icon: "email" },
    { name: "phone", label: t("auth.phone"), type: "text", icon: "phone" },
    { name: "subject", label: t("auth.subject"), type: "text", icon: "subject" },
    { name: "message", label: t("auth.message"), type: "textarea", icon: "message" },
  ];

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post(`/homefix/contact-us`, formData);
      if (res.status === 200) {
        toast.success(t("messageSentSuccessfully"));
        setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
      } else {
        toast.error(t("someThingWentWrong"));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">{t("contact.title")}</h2>

      {image && <img src={image} alt="Contact Us" className="contact-image" />}

      <Form className="contact-form" onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <InputField
            key={index}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange}
            icon={`/icons/${field.icon}.svg`}
            required
          />
        ))}

        <SubmitButton loading={loading} name={t("auth.send")} className="confirm-btn" />
      </Form>
    </div>
  );
};

export default ContactForm;
