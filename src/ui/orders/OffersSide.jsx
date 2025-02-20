import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OfferCard from "../cards/OfferCard";
import UserReceipt from "./UserReceipt";

export default function OffersSide({ orderDetails }) {
  const { t } = useTranslation();
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
                <Link
                  to={`tel:${
                    offer?.technical?.country_code + offer?.technical?.phone
                  }`}
                >
                  <img src="/icons/phone-fill.svg" alt="" />
                </Link>
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

      {orderDetails?.status === "set_maintenance_cost" && (
        <UserReceipt orderDetails={orderDetails} />
      )}
    </Col>
  );
}
