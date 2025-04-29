import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import OfferCard from "../cards/OfferCard";
import UserReceipt from "./UserReceipt";
import PaymentModal from "../modals/PaymentModal";
import axiosInstance from "../../utils/axiosInstance";
import TechnicalRate from "../modals/TechnicalRate";
import useWebSocket from "../../hooks/useWebSocket";

export default function OffersSide({ orderDetails }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("cash");
  const [rateLoading, setRateLoading] = useState(false);
  const [formData, setFormData] = useState({
    stars: 0,
    notes: "",
    order_id: orderDetails?.id,
    provider_id: orderDetails?.technical?.id,
  });
  const queryClient = useQueryClient();
  const { subscribeToOrderUpdates, subscribeToOfferUpdates } = useWebSocket();

  const viewReciept = () => {
    if (orderDetails?.status === "set_maintenance_cost") return false;
    if (orderDetails?.status === "confirm_items") return true;
    if (orderDetails?.status === "client_accept_cost") return true;
    if (orderDetails?.status === "start_maintenance") return true;
    if (orderDetails?.status === "end_maintenance") return true;
    if (orderDetails?.status === "confirm_collection") return true;

    return false;
  };

  const showRating = () => {
    if (!orderDetails?.has_rated) {
      if (orderDetails?.status === "end_maintenance") return true;
      if (orderDetails?.status === "confirm_collection") return true;
      if (orderDetails?.status === "set_images") return true;
      if (orderDetails?.status === "complete") return true;

      return false;
    } else {
      return false;
    }
  };

  // استخدام WebSocket للاشتراك في تحديثات الطلبات والعروض
  useEffect(() => {
    if (orderDetails?.id) {
      // الاشتراك في تحديثات الطلب الحالي
      const orderUnsubscribe = subscribeToOrderUpdates((data) => {
        console.log("تم استلام تحديث للطلب عبر WebSocket:", data);
      });

      // الاشتراك في تحديثات العروض
      const offerUnsubscribe = subscribeToOfferUpdates((data) => {
        console.log("تم استلام تحديث للعروض عبر WebSocket:", data);
      });

      // إلغاء الاشتراك عند إزالة المكون
      return () => {
        orderUnsubscribe();
        offerUnsubscribe();
      };
    }
  }, [orderDetails?.id, subscribeToOrderUpdates, subscribeToOfferUpdates]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.put(
        `/homefix/order-payment/${orderDetails?.id}`,
        { payment_type: paymentType }
      );

      if (res?.data?.code === 200) {
        setShow(false);
        // لا نحتاج لاستدعاء invalidateQueries هنا لأن WebSocket سيقوم بذلك
        // عند استلام تحديث من الخادم
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong, please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (e) => {
    e.preventDefault();
    setRateLoading(true);

    try {
      const res = await axiosInstance.post(
        "homefix/provider-reviews",
        formData
      );

      if (res?.data?.code === 200) {
        setShowRate(false);
        // لا نحتاج لاستدعاء invalidateQueries هنا لأن WebSocket سيقوم بذلك
        // عند استلام تحديث من الخادم
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong, please try again or contact us.");
    } finally {
      setRateLoading(false);
    }
  };

  return (
    <Col lg={4} className="p-2">
      {orderDetails?.offers?.filter((offer) => offer?.status === "accept")
        ?.length > 0 ? (
        <>
          {orderDetails?.offers
            ?.filter((offer) => offer?.status === "accept")
            ?.map((offer) => (
              <div className="technical_card" key={offer?.id}>
                <div className="technical">
                  <div className="img">
                    <img
                      src={offer?.technical?.image}
                      alt={offer?.technical?.name}
                    />
                  </div>
                  <div className="content">
                    <h6>{offer?.technical?.name}</h6>
                    <p>{offer?.technical?.provide_detail?.specialty?.title}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Link
                    to={`tel:${
                      offer?.technical?.country_code + offer?.technical?.phone
                    }`}
                  >
                    <img src="/icons/phone-fill.svg" alt="" />
                  </Link>
                  {showRating() && (
                    <button
                      className="rate_btn"
                      onClick={() => setShowRate(true)}
                    >
                      <img src="/icons/star.svg" alt="star" />
                      {t("rateTechnical")}
                    </button>
                  )}
                </div>
              </div>
            ))}
        </>
      ) : (
        <div className="driversList p-3">
          {(!orderDetails?.offers || orderDetails?.offers.length === 0) && (
            <h6 className="noOffers">{t("noOffers")}</h6>
          )}

          {orderDetails?.offers?.filter((offer) => offer.status === "accept")
            .length === 0 && (
            <>
              {orderDetails?.offers?.map((offer) => (
                <OfferCard
                  key={offer.id}
                  orderId={orderDetails?.id}
                  offer={offer}
                />
              ))}
            </>
          )}
        </div>
      )}

      {viewReciept() && <UserReceipt orderDetails={orderDetails} />}

      {orderDetails?.status === "end_maintenance" && !orderDetails?.is_paid && (
        <div className="pay_container">
          <div className="content">
            <h6>{t("totalCost")}: </h6>
            <h5>
              {orderDetails?.total_cost} <span>{t("dinar")}</span>
            </h5>
          </div>
          <button onClick={() => setShow(true)}>{t("confirmPayment")}</button>
        </div>
      )}

      <PaymentModal
        show={show}
        setShow={setShow}
        paymentType={paymentType}
        loading={loading}
        handlePayment={handlePayment}
        setPaymentType={setPaymentType}
      />

      <TechnicalRate
        show={showRate}
        setShow={setShowRate}
        loading={rateLoading}
        formData={formData}
        setFormData={setFormData}
        handleRate={handleRate}
      />
    </Col>
  );
}
