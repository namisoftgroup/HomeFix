import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import StarsRate from "../StarsRate";

export default function OfferCard({ offer }) {
  const { t } = useTranslation();
  return (
    <Card className="driverCard ">
      <div className="d-flex justify-content-between align-items-center">
        <div className="driverInfo">
          <img
            src={offer?.technical?.image}
            className="driverImage"
            alt={name}
          />
          <div>
            <p className="driverName">{offer?.technical?.name}</p>
            <StarsRate rate={offer?.technical?.average_rating} />
          </div>
        </div>
        <p className="price">
          <strong>{offer?.cost}</strong> {t("dinar")}
        </p>
      </div>

      <div className="buttonGroup">
        <button className="acceptBtn">{t("accept")}</button>
        <button className="rejectBtn">{t("refuse")}</button>
      </div>
    </Card>
  );
}
