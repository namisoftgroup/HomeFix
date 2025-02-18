import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import OrderInfo from "../ui/cards/OrderInfoCard";
import useGetOrder from "../hooks/orders/useGetOrder";
import OfferCard from "../ui/cards/OfferCard";
import CancelOrder from "../ui/modals/CancelOrder";
import useChangeOrderStatus from "../hooks/orders/useChangeOrderStatus";
import OrderStatus from "../ui/cards/OrderStatus";

export default function OrderDetails() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const { data: orderDetails } = useGetOrder();
  const { changeStatus, isPending } = useChangeOrderStatus();

  const handleSubmit = (e) => {
    e.preventDefault();
    changeStatus(
      {
        orderId: orderDetails?.id,
        request: {
          status: "canceled",
          cancel_reason: cancelReason,
        },
      },
      {
        onSuccess: (res) => {
          if (res?.code === 200) {
            toast.success(res?.message);
            setCancelReason("");
            setShowModal(false);
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
    <section className="orderDetails">
      <Container>
        <Row>
          <Col lg={12} className="p-2">
            <h2>{t("orderDetails")}</h2>
          </Col>

          <Col lg={12} className="p-2">
            <OrderStatus orderDetails={orderDetails} />
          </Col>

          {orderDetails?.status !== "canceled" && (
            <Col lg={4} className="p-2">
              <div className="driversList p-3">
                {(!orderDetails?.offers ||
                  orderDetails?.offers.length === 0) && (
                  <h6 className="noOffers">{t("noOffers")}</h6>
                )}

                {orderDetails?.offers?.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </Col>
          )}

          <Col
            lg={orderDetails?.status === "canceled" ? 12 : 8}
            className="p-2"
          >
            <OrderInfo orderDetails={orderDetails} />
            {orderDetails?.status !== "canceled" && (
              <button
                className="cancelButton"
                onClick={() => setShowModal(true)}
              >
                {t("cancelOrder")}
              </button>
            )}
          </Col>
        </Row>
      </Container>

      <CancelOrder
        show={showModal}
        setShow={setShowModal}
        loading={isPending}
        cancelReason={cancelReason}
        handleSubmit={handleSubmit}
        setCancelReason={setCancelReason}
      />
    </section>
  );
}
