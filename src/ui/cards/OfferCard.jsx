import { Card } from "react-bootstrap";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import StarsRate from "../StarsRate";
import useChangeOfferStatus from "../../hooks/orders/useChangeOfferStatus";

export default function OfferCard({ offer, orderId }) {
  const { t } = useTranslation();
  const { isPending, changeOfferStatus } = useChangeOfferStatus();
  const queryClient = useQueryClient();

  const handleChange = (status) => {
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
            queryClient.invalidateQueries(["orders", "order-details"]);
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
        <button
          className="acceptBtn"
          disabled={isPending}
          onClick={() => handleChange("accept")}
        >
          {t("accept")}
        </button>

        <button
          className="rejectBtn"
          disabled={isPending}
          onClick={() => handleChange("client_refused")}
        >
          {t("refuse")}
        </button>
      </div>
    </Card>
  );
}
