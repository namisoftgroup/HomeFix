import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import OrderCard from "./../ui/cards/OrderCard";
import DataLoader from "../ui/loaders/DataLoader";
import useGetProviderOrders from "../hooks/orders/useGetProviderOrders";

const ProviderOrders = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("new");
  const { data: orders, isLoading } = useGetProviderOrders();

  useEffect(() => {
    setActiveTab(searchParams.get("type") || "new");
  }, [searchParams]);

  return isLoading ? (
    <DataLoader />
  ) : (
    <div className="orders-container">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="tabs">
              <button
                className={activeTab === "new" ? "active" : ""}
                onClick={() => setSearchParams({ type: "new" })}
              >
                {t("new")}
              </button>

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

          {orders?.length === 0 && (
            <div className="col-12 p-2">
              <div className="no-data">{t("noNewOrdersAvailable")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderOrders;
