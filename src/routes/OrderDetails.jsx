import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import OrderInfo from "../ui/cards/OrderInfoCard";
import useGetOrder from "../hooks/orders/useGetOrder";
import OfferCard from "../ui/cards/OfferCard";

export default function OrderDetails() {
  const { t } = useTranslation();
  const { data: orderDetails } = useGetOrder();

  return (
    <section className="orderDetails">
      <Container>
        <Row>
          <Col lg={12} className="p-2">
            <h2>{t("orderDetails")}</h2>
          </Col>

          <Col lg={12} className="p-2">
            <button className="searchButton" disabled>
              جاري تلقي العروض
            </button>
          </Col>

          <Col lg={4} className="p-2">
            <div className="driversList p-3">
              {orderDetails?.offers?.map((offer) => (
                <OfferCard key={offer?.id} offer={offer} />
              ))}
            </div>
          </Col>

          <Col lg={8} className="p-2">
            <OrderInfo orderDetails={orderDetails} />
            <button className="cancelButton">إلغاء الطلب</button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
