import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import OrderCard from "./../ui/cards/OrderCard";
import useGetOrders from "../hooks/orders/useGetOrders";

const Orders = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("current");
  const { data: orders } = useGetOrders();

  useEffect(() => {
    setActiveTab(searchParams.get("type") || "current");
  }, [searchParams]);

  return (
    <div className="orders-container">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="tabs">
              <button
                className={activeTab === "current" ? "active" : ""}
                onClick={() => setSearchParams({ type: "current" })}
              >
                {t("current")}
              </button>
              <button
                className={activeTab === "previous" ? "active" : ""}
                onClick={() => setSearchParams({ type: "previous" })}
              >
                {t("previous")}
              </button>
            </div>
          </div>

          {orders?.map((order) => (
            <div className="col-lg-6 col-12 p-2" key={order?.id}>
              <OrderCard order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
