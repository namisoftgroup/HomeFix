import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import DataLoader from "../ui/loaders/DataLoader";
import useGetOrder from "../hooks/orders/useGetOrder";
import OrderInfoCard from "../ui/orders/OrderInfoCard";
import AddOfferForm from "../ui/orders/AddOfferForm";
import OrderTimeLine from "../ui/orders/OrderTimeLine";

export default function TechnicalOrder() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();

  const { data: orderDetails, isLoading } = useGetOrder();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate("/");
      return;
    }

    if (
      !isLoading &&
      (!orderDetails || Object.keys(orderDetails).length === 0)
    ) {
      navigate("/");
    }
  }, [id, isLoading, navigate, orderDetails]);

  if (isLoading) return <DataLoader />;

  return (
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

          {orderDetails?.status !== "client_refuse_cost" && (
            <Col lg={4} md={6} className="p-2">
              {orderDetails?.status === "new" &&
              orderDetails?.offers?.status !== "set_price" ? (
                <AddOfferForm orderDetails={orderDetails} />
              ) : (
                <OrderTimeLine orderDetails={orderDetails} />
              )}
            </Col>
          )}

          <Col
            lg={orderDetails?.status !== "client_refuse_cost" ? 8 : 12}
            md={6}
            className="p-2"
          >
            {orderDetails?.status === "client_refuse_cost" && (
              <div className="canceled_order mb-4">
                <h6>{t("canceledByClient")}</h6>
                <div className="d-flex flex-wrap gap-4">
                  <p>
                    {t("cancelReason")}: <span>{t("clientRefusedCost")}</span>
                  </p>
                  <p>
                    <i className="fa-regular fa-clock"></i>{" "}
                    {orderDetails?.order_status_history?.client_refuse_cost}
                  </p>
                </div>
              </div>
            )}
            <OrderInfoCard orderDetails={orderDetails} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
