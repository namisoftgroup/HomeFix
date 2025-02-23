import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { logout } from "../../redux/slices/clientData";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "./../../hooks/useAuth";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";

export default function UserDropDown() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isAuthed } = useAuth();
  const { client } = useSelector((state) => state.clientData);
  const [, , deleteCookie] = useCookies(["token", "id"]);

  const queryClient = useQueryClient();

  const handleShow = (e) => {
    if (!isAuthed) {
      e.preventDefault();
      dispatch(setShowAuthModal(true));
    }
  };

  const performLogout = async () => {
    try {
      const deleteToken = await axiosInstance.post("/auth/logout");

      if (deleteToken.data.code === 200) {
        deleteCookie("token");
        deleteCookie("id");

        delete axiosInstance.defaults.headers.common["Authorization"];

        dispatch(logout());

        queryClient.clear();

        localStorage.setItem("userType", "client");

        toast.success(deleteToken.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error(error.message);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="rounded_btn">
        <img
          className={client?.image ? "user_img" : ""}
          src={client?.image ? client?.image : "/icons/user.svg"}
          alt="user_alt"
          onClick={handleShow}
        />
      </Dropdown.Toggle>

      {isAuthed && (
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={"/edit-profile"}>
            {t("editProfile")}
          </Dropdown.Item>

          {localStorage.getItem("userType") === "client" && (
            <Dropdown.Item as={Link} to={"/my-orders"}>
              {t("myOrders")}
            </Dropdown.Item>
          )}

          <Dropdown.Item onClick={performLogout}>{t("logout")}</Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}
