import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/clientData";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import axiosInstance from "../utils/axiosInstance";
import ConfirmDeleteAccount from "../ui/modals/ConfirmDeleteAccount";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [, , deleteCookie] = useCookies(["token", "id"]);
  const [show, setShow] = useState(false);

  const performLogout = async () => {
    try {
      const deleteToken = await axiosInstance.post("/auth/logout");
      if (deleteToken.data.code === 200) {
        deleteCookie("token");
        deleteCookie("id");
        delete axiosInstance.defaults.headers.common["Authorization"];
        dispatch(logout());
        navigate("/");
        queryClient.clear();
        localStorage.setItem("userType", "client");
        toast.success(deleteToken.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error(error.message);
    }
  };

  const settingsOptions = [
    { img: "/icons/user.svg", text: t("myProfile"), path: "/edit-profile" },
    {
      img: "/icons/notifications.svg",
      text: t("notifications"),
      path: "/notifications",
    },
    { img: "/icons/contactus.svg", text: t("contactus"), path: "/contactus" },
    { img: "/icons/FAQ.svg", text: t("faqs"), path: "/faq" },
    { img: "/icons/About.svg", text: t("aboutus"), path: "/aboutus" },
    {
      img: "/icons/Privacy Policy.svg",
      text: t("privacyPolicy"),
      path: "/privacy",
    },
    {
      img: "/icons/Terms.svg",
      text: t("termsAndConditions"),
      path: "/terms-and-conditions",
    },
  ];

  return (
    <section className="settings container">
      <div className="settings-list">
        {settingsOptions.map((option, index) => (
          <Link to={option.path} key={index} className="settings-item">
            <div className="content">
              <img src={option.img} alt={option.text} className="icon-img" />
              <span className="text">{option.text}</span>
            </div>
            <span className="arrow">
              <i className="fas fa-chevron-left"></i>
            </span>
          </Link>
        ))}

        <div className="settings-item delete">
          <div className="content">
            <img
              src="/icons/deleteaccount.svg"
              alt="delete account"
              className="icon-img"
            />
            <span className="text" onClick={() => setShow(true)}>
              {t("deleteAccount")}
            </span>
          </div>
        </div>
      </div>

      <button className="logout" onClick={performLogout}>
        <img src="/icons/logout.svg" alt="logout" className="icon-img" />
        <span className="text">{t("logout")}</span>
      </button>
      <ConfirmDeleteAccount show={show} setShow={setShow} />
    </section>
  );
}
