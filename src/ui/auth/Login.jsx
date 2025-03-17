import { useEffect } from "react";
import { toast } from "sonner";
import { Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import * as yup from "yup";
import axiosInstance from "../../utils/axiosInstance";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PhoneInput from "../../ui/form-elements/PhoneInput";

function Login({ setFormType, userType, setUserType }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token", "id"]);

  const schema = yup.object().shape({
    phone: yup
      .string()
      .required(t("validation.phoneRequired"))
      .matches(/^0|7\d{8}$/, t("validation.phoneInvalid")),
    password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength"))
      .matches(/[A-Z]/, t("validation.passwordCapitalLetter"))
      .matches(/[a-z]/, t("validation.passwordSmallLetter")),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: "",
      password: "",
      country_code: "+962",
      type: userType,
    },
  });

  useEffect(() => {
    setValue("type", userType);
  }, [userType, setValue]);

  const onSubmit = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        phone: watch("phone").startsWith("0")
          ? watch("phone")?.slice(1)
          : watch("phone"),
        password: watch("password"),
        type: watch("type"),
        country_code: watch("country_code"),
      });

      if (res.data.code === 200) {
        setCookie("token", res.data?.data?.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        setCookie("id", res.data?.data?.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        toast.success(res.data.message);
        dispatch(setShowAuthModal(false));
        localStorage.setItem("userType", userType);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again or contact support.");
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="head">
          {t("auth.loginTitle")} <span>{t("HomeFix")}</span>
        </h2>
        <p className="sub-head">{t("auth.loginSubtitle")}</p>
      </div>

      <div className="input-field mb-4">
        <div className="radios">
          {["client", "provider"].map((type) => (
            <label key={type} htmlFor={type}>
              <input
                type="radio"
                name="userState"
                id={type}
                value={type}
                checked={userType === type}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span className={userType === type ? "active" : ""}>
                {t(`auth.${type === "client" ? "client" : "technical"}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <PhoneInput
          label={t("auth.phone")}
          placeholder={t("auth.phone")}
          id="phone"
          countryCode={watch("country_code")}
          error={errors.phone?.message}
          {...register("phone")}
        />

        <PasswordField
          label={t("auth.password")}
          placeholder={t("auth.password")}
          id="password"
          error={errors.password?.message}
          {...register("password")}
        />

        <span
          className="forgetpass"
          style={{ cursor: "pointer" }}
          onClick={() => setFormType("forget")}
        >
          {t("auth.forgetPassword")}
        </span>

        <SubmitButton name={t("auth.login")} loading={isSubmitting} />

        <p className="noAccount">
          {t("auth.dontHaveAccount")}{" "}
          <span
            onClick={() =>
              setFormType(
                userType === "client" ? "register" : "register-technical"
              )
            }
          >
            {t("auth.createAccount")}
          </span>
        </p>
      </Form>
    </>
  );
}

export default Login;
