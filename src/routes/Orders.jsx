import { useState } from "react";
import CurrentOrders from "../ui/Orders/CurrentOrders";
import PreviousOrders from "../ui/Orders/PreviousOrders";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("current"); 

  return (
    <div className="orders-container">
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

      {activeTab === "current" ? <CurrentOrders /> : <PreviousOrders />}
    </div>
  );
};

export default Orders;
