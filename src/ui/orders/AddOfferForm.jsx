import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import useChangeOfferStatus from "../../hooks/orders/useChangeOfferStatus";
import useGetProviderOrders from "../../hooks/orders/useGetProviderOrders";

export default function AddOfferForm({ orderDetails }) {
  const { t } = useTranslation();
  const [cost, setCost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefusing, setIsRefusing] = useState(false);
  const { changeOfferStatus } = useChangeOfferStatus();
  const { refetch } = useGetProviderOrders();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
            queryClient.invalidateQueries({ queryKey: ["order-details"] });
            refetch();
          } else {
            toast.error(res?.message);
          }
        },
        onError: (err) => {
          console.log(err);
          toast.error("Something went wrong, please try again or contact us.");
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  const handleRefuse = () => {
    setIsRefusing(true);
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
            refetch();
          } else {
            toast.error(res?.message);
          }
        },
        onError: (err) => {
          console.log(err);
          toast.error("Something went wrong, please try again or contact us.");
        },
        onSettled: () => {
          setIsRefusing(false);
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
          onClick={handleRefuse}
          style={{
            opacity: isRefusing ? 0.7 : 1,
            pointerEvents: isRefusing ? "none" : "auto",
          }}
        >
          {t("unInterested")}
        </div>
        <SubmitButton name={t("addOffer")} loading={isSubmitting} />
      </div>
    </form>
  );
}
