import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function OrderTimeLine({ orderDetails }) {
  const { t } = useTranslation();

  const historyStatus = [
    "new",
    "accept",
    "confirm_arrival",
    "confirm_items",
    "set_maintenance_cost",
    "client_accept_cost",
    "start_maintenance",
    "end_maintenance",
    "confirm_collection",
    "set_images",
    "complete",
  ];

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

      <div className="providerTimeLine">
        {historyStatus?.map((status, index) => (
          <div
            className={`step ${
              orderDetails?.order_status_history?.[status] ? "done" : ""
            }`}
            key={index}
          >
            <div className="statusLine">
              <div className="icon">
                <img
                  src={
                    orderDetails?.order_status_history?.[status]
                      ? "/icons/check.svg"
                      : "/icons/wait.svg"
                  }
                  alt=""
                />
              </div>
            </div>
            {status === "new" ? (
              <div className="content">
                <h6 className="title">
                  {t("priceOffer")}
                  <span className="price">
                    {orderDetails?.offers?.cost} <small> {t("dinar")} </small>
                  </span>
                </h6>
                <p className="dateTime">
                  <span>{orderDetails?.order_status_history?.new}</span>
                </p>
                {orderDetails?.status == "new" && (
                  <div className="waitingClient">{t("waitingClient")}</div>
                )}
              </div>
            ) : (
              <div className="content">
                <h6 className="title">{t(`orderHistoryStatus.${status}`)}</h6>
                {orderDetails?.order_status_history?.[status] && (
                  <p className="dateTime">
                    <span>{orderDetails?.order_status_history?.[status]}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
