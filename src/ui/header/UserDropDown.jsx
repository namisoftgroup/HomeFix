import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { setShowAuthModal } from "../../redux/slices/showAuthModal";
import { useDispatch } from "react-redux";

export default function UserDropDown() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Dropdown>
      <Dropdown.Toggle  className="rounded_btn">
        <img src="/icons/user.svg" alt="user_alt" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => dispatch(setShowAuthModal(true))}>
          {t("login")}
        </Dropdown.Item>
      
      </Dropdown.Menu>
    </Dropdown>
  );
}
