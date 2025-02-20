import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "./../form-elements/SubmitButton";
import useChangeOrderStatus from "../../hooks/orders/useChangeOrderStatus";
import AddItemsModal from "../modals/AddItemsModal";
import InputField from "../form-elements/InputField";
import Receipt from "./Receipt";

export default function OrderTimeLine({ orderDetails }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending, changeOrderStatus } = useChangeOrderStatus();

  const [maintenanceCost, setMaintenanceCost] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

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

  const handleChangeStatus = (status) => {
    changeOrderStatus(
      {
        orderId: orderDetails?.id,
        request: {
          status: status,
        },
      },
      {
        onSuccess: (res) => {
          if (res?.code === 200) {
            toast.success(res?.message);
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["order-details", orderDetails?.id]);
          } else {
            toast.error(res?.message);
          }
        },
        onError: (err) => {
          console.log(err);
          toast.error("Some thing went wrong, please try again or contact us.");
        },
      }
    );
  };

  const confirmItems = () => {
    changeOrderStatus(
      {
        orderId: orderDetails?.id,
        request: {
          status: "confirm_items ",
          order_items: orderItems,
        },
      },
      {
        onSuccess: (res) => {
          if (res?.code === 200) {
            toast.success(res?.message);
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["order-details", orderDetails?.id]);
          } else {
            toast.error(res?.message);
          }
        },
        onError: (err) => {
          console.log(err);
          toast.error("Some thing went wrong, please try again or contact us.");
        },
      }
    );
  };

  const handleSetMaintenanceCost = (e) => {
    e.preventDefault();
    if (!maintenanceCost) {
      return;
    }
    changeOrderStatus(
      {
        orderId: orderDetails?.id,
        request: {
          status: "set_maintenance_cost",
          maintenance_cost: maintenanceCost,
        },
      },
      {
        onSuccess: (res) => {
          if (res?.code === 200) {
            toast.success(res?.message);
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["order-details", orderDetails?.id]);
          } else {
            toast.error(res?.message);
          }
        },
        onError: (err) => {
          console.log(err);
          toast.error("Some thing went wrong, please try again or contact us.");
        },
      }
    );
  };

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

                {orderDetails?.status === "accept" &&
                  status === "confirm_arrival" && (
                    <div className="form">
                      <SubmitButton
                        name={t("confirmArrival")}
                        onClick={() => handleChangeStatus("confirm_arrival")}
                        loading={isPending}
                      />
                    </div>
                  )}

                {orderDetails?.status === "confirm_arrival" &&
                  status === "confirm_items" && (
                    <div className="form">
                      {orderItems?.length > 0 && (
                        <div className="product_list">
                          <h6>{t("productsAndMaterials")}</h6>
                          <ul>
                            {orderItems?.map((item, index) => (
                              <li key={index}>
                                <h6>{item?.item_name}</h6>
                                <div className="price_actions">
                                  <p>
                                    <b>{item?.item_price}</b> {t("dinar")}
                                  </p>
                                  <span
                                    onClick={() =>
                                      setOrderItems(
                                        orderItems?.filter(
                                          (_, i) => i !== index
                                        )
                                      )
                                    }
                                  >
                                    <img src="/icons/delete.svg" alt="delete" />
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="d-flex gap-2">
                        <SubmitButton
                          className="finish"
                          name={t("finish")}
                          loading={isPending}
                          onClick={confirmItems}
                        />
                        <SubmitButton
                          name={t("add")}
                          disabled={isPending}
                          onClick={() => setShowModal(true)}
                        />
                      </div>
                    </div>
                  )}

                {orderDetails?.status === "confirm_items" &&
                  status === "set_maintenance_cost" && (
                    <form className="form">
                      <div className="d-flex gap-2">
                        <InputField
                          placeholder="00"
                          value={maintenanceCost}
                          onChange={(e) => setMaintenanceCost(e.target.value)}
                        />
                        <SubmitButton
                          name={t("confirm")}
                          loading={isPending}
                          onClick={handleSetMaintenanceCost}
                        />
                      </div>
                    </form>
                  )}

                {orderDetails?.status === "set_maintenance_cost" &&
                  status === "client_accept_cost" && (
                    <Receipt orderDetails={orderDetails} />
                  )}

                {orderDetails?.status === "client_accept_cost" &&
                  status === "start_maintenance" && (
                    <div className="form">
                      <SubmitButton
                        name={t("confirmStart")}
                        onClick={() => handleChangeStatus("start_maintenance")}
                        loading={isPending}
                      />
                    </div>
                  )}

                {orderDetails?.status === "start_maintenance" &&
                  status === "end_maintenance" && (
                    <div className="form">
                      <SubmitButton
                        name={t("endMaintenance")}
                        onClick={() => handleChangeStatus("end_maintenance")}
                        loading={isPending}
                      />
                    </div>
                  )}
              </div>
            )}
          </div>
        ))}
      </div>
      <AddItemsModal
        show={showModal}
        setShow={setShowModal}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
      />
    </>
  );
}
