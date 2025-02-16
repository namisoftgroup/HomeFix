import { Container } from "react-bootstrap";
import DriverCard from "../ui/cards/OffersCard"; 
import OrderInfo from "../ui/cards/OrderInfoCard";

export default function OrderDetails() {
  const drivers = [
    { name: "عماد مجدي", rating: 5, cost: 15, image: "/icons/avatar.svg" },
    { name: "عماد مجدي", rating: 2, cost: 15, image: "/icons/avatar.svg" }
  ];

  return (
    <Container className="orderDetails">
      <h2>بيانات الطلب</h2>

      <button className="searchButton" disabled>
        جاري تلقي العروض
      </button>

      <div className="driversList p-3">
        {drivers.map((driver, index) => (
          <DriverCard key={index} {...driver} />
        ))}
      </div>

      <div className="orderDetails p-3">
          <OrderInfo />
      </div>

      <button className="cancelButton">إلغاء الطلب</button>
    </Container>
  );
}
