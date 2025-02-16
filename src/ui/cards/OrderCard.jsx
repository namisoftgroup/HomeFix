import { Link } from "react-router-dom";

const OrderCard = ({ order, isPrevious }) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <div className="service-icon">
          <img src={order.icon} alt={order.service} />
          <span>{order.service}</span>
        </div>
        <Link to={`/order-details?id=${order.id}`} className="details">
          التفاصيل
        </Link>
      </div>
      <div className="order-content">
        <div className="order-info">
          <p>
            <i className="fa-solid fa-location-dot"></i> {order.location}
          </p>
          <p>
            <i className="fa-regular fa-calendar"></i> {order.date}
          </p>
          <p>
            <i className="fa-regular fa-clock"></i> {order.time}
          </p>
        </div>
      </div>
      {isPrevious && <button className="cancel-btn">طلب ملغي</button>}
    </div>
  );
};

export default OrderCard;
