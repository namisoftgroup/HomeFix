import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "./../form-elements/SubmitButton";
import useChangeOrderStatus from "../../hooks/orders/useChangeOrderStatus";

export default function OrderTimeLine({ orderDetails }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isPending, changeOrderStatus } = useChangeOrderStatus();

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

  const handleConfirmArrival = () => {
    changeOrderStatus(
      {
        orderId: orderDetails?.id,
        request: {
          status: "confirm_arrival",
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
                        onClick={handleConfirmArrival}
                        loading={isPending}
                      />
                    </div>
                  )}

                {orderDetails?.status === "confirm_arrival" &&
                  status === "confirm_items" && (
                    <div className="form">
                      <div className="d-flex gap-2">
                        <button className="finish">{t("finish")}</button>
                        <SubmitButton name={t("add")} />
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
