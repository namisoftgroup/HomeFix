import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  const { t } = useTranslation();
  const { client } = useSelector((state) => state.clientData);

  const link =
    client?.type === "provider" ? `/${order.id}` : `/my-orders/${order.id}`;

  return (
    <div className="order-card">
      <div className="order-header">
        <div className="service-icon">
          <img src={order?.service?.image} alt={order.service} />
          <span>{order?.service?.title}</span>
        </div>
        <Link to={link} className="details">
          {t("details")}
        </Link>
      </div>
      <div className="order-content">
        <div className="order-info">
          <p>
            <i className="fa-regular fa-calendar"></i> {order?.date}
          </p>
          <p>
            <i className="fa-regular fa-clock"></i> {order?.time}
          </p>
          <p className="w-100">
            <i className="fa-solid fa-location-dot"></i> {order?.address}
          </p>
        </div>
      </div>
      {order?.status === "complete" && (
        <div className="complete">{t("completedOrder")}</div>
      )}
      {order?.status === "canceled" && (
        <div className="canceled">{t("canceledOrder")}</div>
      )}
      {order?.status === "client_refuse_cost" && (
        <div className="canceled">{t("clientRefusedCost")}</div>
      )}
    </div>
  );
};

export default OrderCard;
