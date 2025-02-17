import { useState } from "react";
import OrderCard from "./../ui/cards/OrderCard";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("current");
  const orders = [
    {
      id: 1,
      service: "الكهرباء",
      time: "03:23 م",
      date: "11/11/2025",
      location: "عمان شارع جامعة الدول",
      icon: "/images/service3.svg",
      isPrevious: false,
    },
    {
      id: 2,
      service: "الصيانة",
      time: "03:23 م",
      date: "07/10/2025",
      location: "عمان شارع جامعة الدول",
      icon: "/images/service1.svg",
      isPrevious: true,
    },
  ];

  return (
    <div className="orders-container">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2 mb-3">
            <div className="tabs">
              <button
                className={activeTab === "current" ? "active" : ""}
                onClick={() => setActiveTab("current")}
              >
                الحالية
              </button>
              <button
                className={activeTab === "previous" ? "active" : ""}
                onClick={() => setActiveTab("previous")}
              >
                السابقة
              </button>
            </div>
          </div>
          {orders.map((order) => (
            <div className="col-lg-6 col-12 p-2" key={order.id}>
              <OrderCard order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
