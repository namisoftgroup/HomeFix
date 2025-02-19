import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function OrderTimeLine({ orderDetails }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="technical_card">
        <div className="technical">
          <div className="content">
            <p>{t("client")}</p>
            <h6>{orderDetails?.client?.name}</h6>
          </div>
        </div>
        <Link
          to={`tel:${
            orderDetails?.client?.country_code + orderDetails?.client?.phone
          }`}
        >
          <img src="/icons/phone-fill.svg" alt="" />
        </Link>
      </div>
    </>
  );
}
