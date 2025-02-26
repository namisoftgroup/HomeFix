import i18next from "i18next";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/slices/languageSlice";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

export default function LanguageDropDown() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const handleLanguageChange = (selectedLanguage) => {
    dispatch(setLanguage(selectedLanguage));
    localStorage.setItem("lang", selectedLanguage);
    i18next.changeLanguage(selectedLanguage);
    queryClient.invalidateQueries();
    queryClient.removeQueries();
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", selectedLanguage === "en");
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="rounded_btn">
        <i className="fa-sharp fa-regular fa-globe"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLanguageChange("en")}>
          {t("english")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange("ar")}>
          {t("arabic")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
