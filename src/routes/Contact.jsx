import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "../ui/form-elements/SubmitButton";
import InputField from "../ui/form-elements/InputField";
import axiosInstance from "../utils/axiosInstance";

const Contact = () => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    name: yup.string().required(t("validation.nameRequired")),
    email: yup
      .string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    subject: yup.string().required(t("validation.subjectRequired")),
    message: yup
      .string()
      .required(t("validation.messageRequired"))
      .min(10, t("validation.messageMinLength")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(errors);
    
    try {
      const res = await axiosInstance.post(`/homefix/contact-us`, data);
      if (res.data.code === 200) {
        toast.success(t("messageSentSuccessfully"));
        reset();
      } else {
        toast.error(t("someThingWentWrong"));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("someThingWentWrong"));
    }
  };

  return (
    <section className="contact_page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12 p-2">
            <h2 className="contact-title">{t("contactTitle")}</h2>
            <p className="contact-text">{t("contactText")}</p>

            <Form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label={t("auth.name")}
                name="name"
                id="name"
                icon="/icons/user.svg"
                {...register("name")}
                error={errors.name?.message}
              />

              <InputField
                label={t("auth.email")}
                name="email"
                id="email"
                type="email"
                icon="/icons/email.svg"
                {...register("email")}
                error={errors.email?.message}
              />

              <InputField
                label={t("auth.subject")}
                name="subject"
                id="subject"
                icon="/icons/subject.svg"
                {...register("subject")}
                error={errors.subject?.message}
              />

              <InputField
                label={t("auth.message")}
                name="message"
                id="message"
                as="textarea"
                icon="/icons/message.svg"
                {...register("message")}
                error={errors.message?.message}
              />

              <SubmitButton
                loading={isSubmitting}
                name={t("auth.send")}
                className="confirm-btn"
              />
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
