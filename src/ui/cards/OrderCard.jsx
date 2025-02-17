import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const OrderCard = ({ order, isPrevious }) => {
  const { t } = useTranslation();
  return (
    <div className="order-card">
      <div className="order-header">
        <div className="service-icon">
          <img src={order?.service?.image} alt={order.service} />
          <span>{order?.service?.title}</span>
        </div>
        <Link to={`/my-orders/${order.id}`} className="details">
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
      {isPrevious && <button className="cancel-btn">طلب ملغي</button>}
    </div>
  );
};

export default OrderCard;
