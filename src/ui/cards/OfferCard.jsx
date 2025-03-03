import { Card } from "react-bootstrap";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import StarsRate from "../StarsRate";
import useChangeOfferStatus from "../../hooks/orders/useChangeOfferStatus";
import useGetOrders from "../../hooks/orders/useGetOrders";
import SubmitButton from "../form-elements/SubmitButton";

export default function OfferCard({ offer, orderId }) {
  const { t } = useTranslation();
  const { changeOfferStatus } = useChangeOfferStatus();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const { refetch } = useGetOrders();
  const queryClient = useQueryClient();

  const handleChange = (status) => {
    if (status === "accept") {
      setIsAccepting(true);
    } else {
      setIsRejecting(true);
    }

    changeOfferStatus(
      {
        payload: {
          status,
          offer_id: offer?.id,
        },
        orderId: orderId,
      },
      {
        onSuccess: (res) => {
          if (res?.code === 200) {
            toast.success(res?.message);
            queryClient.invalidateQueries(["order-details"]);
            refetch();
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
    <Card className="driverCard ">
      <div className="d-flex justify-content-between align-items-center">
        <div className="driverInfo">
          <img
            src={offer?.technical?.image}
            className="driverImage"
            alt={offer?.technical?.name}
          />
          <div>
            <p className="driverName">{offer?.technical?.name}</p>
            <StarsRate rate={offer?.technical?.average_rating} />
          </div>
        </div>
        <p className="price">
          <strong>{offer?.cost}</strong> {t("dinar")}
        </p>
      </div>

      <div className="buttonGroup">
        <SubmitButton
          className="acceptBtn"
          loading={isAccepting}
          onClick={() => handleChange("accept")}
          name={t("accept")}
        />

        <SubmitButton
          className="rejectBtn"
          loading={isRejecting}
          onClick={() => handleChange("client_refused")}
          name={t("refuse")}
        />
      </div>
    </Card>
  );
}
