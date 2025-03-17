import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import OtpContainer from "../form-elements/OtpContainer";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function ConfirmRegister({
  data,
  watch,
  userType,
  setFormType,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [, setCookie] = useCookies(["token", "id"]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const checkResponse = await axiosInstance.post("/auth/confirm-code", {
        phone: watch("phone").startsWith("0") ? watch("phone")?.slice(1) : watch("phone"),
        country_code: watch("country_code"),
        type: "register",
        code: code,
      });

      if (checkResponse.data.code === 200) {
        const registerResponse = await axiosInstance.post("/auth/users", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (registerResponse.data.code === 200) {
          const loginPayload = {
            phone: watch("phone").startsWith("0") ? watch("phone")?.slice(1) : watch("phone"),
            password: watch("password"),
            type: data?.type,
            country_code: watch("country_code"),
          };

          const loginResponse = await axiosInstance.post(
            "/auth/login",
            loginPayload
          );

          if (loginResponse.data.code === 200) {
            setCookie("token", loginResponse.data?.data?.token, {
              path: "/",
              secure: true,
              sameSite: "Strict",
            });

            setCookie("id", loginResponse.data?.data?.id, {
              path: "/",
              secure: true,
              sameSite: "Strict",
            });

            toast.success(loginResponse.data.message);
            dispatch(setShowAuthModal(false));
            localStorage.setItem("userType", userType);
          }
        } else {
          toast.error(registerResponse.data.message);
        }
      } else {
        toast.error(checkResponse.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong, please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await axiosInstance.post("/auth/send-code", {
        phone: watch("phone").startsWith("0") ? watch("phone")?.slice(1) : watch("phone"),
        country_code: watch("country_code"),
        type: "register",
      });
      if (res.data.code === 200) {
        toast.success(res.data.message);
        setTimer(60);
        setResendDisabled(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong, please try again or contact us.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="head">{t("auth.resetPasswordTitle")} </h2>
        <p className="sub-head">
          {t("auth.resetPasswordDesc")} <b>{watch("phone")}</b>
        </p>
      </div>

      <OtpContainer setCode={setCode} />

      <div className="resend-code">
        <span className={`resend_link ${resendDisabled ? "disabled" : ""}`}>
          {t("auth.didnotReceiveCode")}
          <span
            className=""
            style={{ cursor: "pointer" }}
            onClick={handleResend}
          >
            {t("auth.resendCode")}
          </span>
        </span>
        <div
          className="timer flex-row-reverse"
          style={{ justifyContent: "end !important" }}
        >
          <span>
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}
          </span>
          :<span>{(timer % 60).toString().padStart(2, "0")}</span>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 mt-2">
        <div
          aria-label="Back"
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setFormType(
              userType === "provider" ? "register-technical" : "register"
            );
          }}
        >
          <i className="fal fa-arrow-right"></i>
        </div>

        <SubmitButton name={t("auth.confirm")} loading={loading} />
      </div>
    </form>
  );
}
