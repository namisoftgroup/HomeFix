import { Card } from "react-bootstrap";
import StarsRate from "../StarsRate";

export default function OfferCard({ offer }) {
  return (
    <Card className="driverCard ">
      <div className="d-flex justify-content-between">
        <div className="driverInfo">
          <img
            src={offer?.technical?.image}
            className="driverImage"
            alt={name}
          />
          <div>
            <p className="driverName">{offer?.technical?.name}</p>
            <StarsRate rate={offer?.technical?.average_rating} />
          </div>
        </div>
        <p className="price">
          <strong>{offer?.cost}</strong> دينار
        </p>
      </div>

      <div className="buttonGroup">
        <button className="acceptBtn">قبول</button>
        <button className="rejectBtn">رفض</button>
      </div>
    </Card>
  );
}
