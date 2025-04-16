import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import OrderInfo from "../ui/cards/OrderInfoCard";
import useGetOrder from "../hooks/orders/useGetOrder";
import CancelOrder from "../ui/modals/CancelOrder";
import useChangeOrderStatus from "../hooks/orders/useChangeOrderStatus";
import OrderStatus from "../ui/cards/OrderStatus";
import DataLoader from "../ui/loaders/DataLoader";
import OffersSide from "../ui/orders/OffersSide";
import useGetOrders from "../hooks/orders/useGetOrders";

export default function OrderDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const { data: orderDetails, isLoading } = useGetOrder();
  const { changeOrderStatus, isPending } = useChangeOrderStatus();
  const { refetch } = useGetOrders();

  const viewCancelButton = () => {
    if (orderDetails?.status === "canceled") return false;
    if (orderDetails?.status === "complete") return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeOrderStatus(
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
            refetch();
            queryClient.invalidateQueries({ queryKey: ["order-details"] });
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

  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="orderDetails">
      <Container>
        <Row>
          <Col lg={12} className="p-2">
            <h2 className="orderDetails-title">
              <button onClick={() => navigate(-1)}>
                <i className="fa-regular fa-angle-right"></i>
              </button>{" "}
              {t("orderDetails")}
            </h2>
          </Col>

          <Col lg={12} className="p-2">
            <OrderStatus orderDetails={orderDetails} />
          </Col>

          {orderDetails?.status !== "canceled" && (
            <OffersSide orderDetails={orderDetails} />
          )}

          <Col
            lg={orderDetails?.status === "canceled" ? 12 : 8}
            className="p-2"
          >
            <OrderInfo orderDetails={orderDetails} />
            {viewCancelButton() && (
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
