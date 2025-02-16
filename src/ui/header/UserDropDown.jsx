import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";

export default function UserDropDown() {
  const { t } = useTranslation();
  const { isAuthed } = useAuth();
  const { client } = useSelector((state) => state.clientData);
  const dispatch = useDispatch();

  return (
    <Dropdown>
      <Dropdown.Toggle className="rounded_btn">
        <img
          className={client?.image ? "h-100" : ""}
          src={client?.image ? client?.image : "/icons/user.svg"}
          alt="user_alt"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {isAuthed ? (
          <>
            <Dropdown.Item as={Link} to={"/edit-profile"}>
              {t("editProfile")}
            </Dropdown.Item>

            <Dropdown.Item as={Link} to={"/my-orders"}>
              {t("myOrders")}
            </Dropdown.Item>

            <Dropdown.Item>{t("logout")}</Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item onClick={() => dispatch(setShowAuthModal(true))}>
              {t("login")}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(setShowAuthModal(true))}>
              {t("createAccount")}
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
