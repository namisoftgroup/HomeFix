import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import useChangeOfferStatus from "../../hooks/orders/useChangeOfferStatus";

export default function AddOfferForm({ orderDetails }) {
  const { t } = useTranslation();
  const [cost, setCost] = useState("");
  const { isPending, changeOfferStatus } = useChangeOfferStatus();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    changeOfferStatus(
      {
        payload: {
          status: "set_price",
          cost: cost,
        },
        orderId: orderDetails?.id,
      },
      {
        onSuccess: (res) => {
          if (res?.code === 200) {
            toast.success(res?.message);
            queryClient.invalidateQueries(["order-details", orderDetails?.id]);
            queryClient.invalidateQueries(["orders"]);
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

  const handleRefuse = () => {
    changeOfferStatus(
      {
        payload: {
          status: "technical_refused",
        },
        orderId: orderDetails?.id,
      },
      {
        onSuccess: (res) => {
          if (res?.code === 200) {
            toast.success(res?.message);
            navigate("/");
            queryClient.invalidateQueries(["orders"]);
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
    <form className="form addOfferForm" onSubmit={handleSubmit}>
      <InputField
        label={t("addPriceOffer")}
        type="number"
        value={cost}
        placeholder="00.0"
        required
        onChange={(e) => setCost(e.target.value)}
      />
      <div className="btns">
        <div
          className="unInterested"
          disabled={isPending}
          onClick={handleRefuse}
        >
          {t("unInterested")}
        </div>
        <SubmitButton name={t("addOffer")} loading={isPending} />
      </div>
    </form>
  );
}
