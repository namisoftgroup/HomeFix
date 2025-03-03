import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useChangeOrderStatus from "../../hooks/orders/useChangeOrderStatus";
import SubmitButton from "../form-elements/SubmitButton";
import { useState } from "react";

export default function UserReceipt({ orderDetails }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { changeOrderStatus } = useChangeOrderStatus();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const viewButtons = () => {
    if (orderDetails?.status === "client_refuse_cost") return false;
    if (orderDetails?.status === "client_accept_cost") return false;
    if (orderDetails?.status === "start_maintenance") return false;
    if (orderDetails?.status === "end_maintenance") return false;
    if (orderDetails?.status === "confirm_collection") return false;

    return true;
  };

  const handleAcceptOrReject = (status) => {
    if (status === "client_accept_cost") {
      setIsAccepting(true);
    } else {
      setIsRejecting(true);
    }
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
        onSettled: () => {
          setIsAccepting(false);
          setIsRejecting(false);
        },
      }
    );
  };

  return (
    <div className="user_receipt">
      <h5>{t("workCost")}</h5>

      <div className="product_list">
        <h6>{t("productsAndMaterials")}</h6>
        <ul>
          {orderDetails?.order_items?.map((item, index) => (
            <li key={index}>
              <h6>{item?.item_name}</h6>
              <p>
                <b>{item?.item_price}</b> {t("dinar")}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <ul className="total_cost_list">
        <li>
          <h6>{t("maintenanceCost")}</h6>
          <p>
            <b>{orderDetails?.maintenance_cost}</b> {t("dinar")}
          </p>
        </li>

        <li className="line"></li>

        <li>
          <h6>{t("totalCost")}</h6>
          <p>
            <b>{orderDetails?.total_cost}</b> {t("dinar")}
          </p>
        </li>
      </ul>
      {viewButtons() && (
        <div className="btns">
          <div className="d-flex gap-3">
            <SubmitButton
              className="button dark"
              onClick={() => handleAcceptOrReject("client_refuse_cost")}
              name={t("rejectPrice")}
              loading={isRejecting}
            />
            <SubmitButton
              className="button"
              onClick={() => handleAcceptOrReject("client_accept_cost")}
              name={t("acceptPrice")}
              loading={isAccepting}
            />
          </div>
        </div>
      )}
    </div>
  );
}
