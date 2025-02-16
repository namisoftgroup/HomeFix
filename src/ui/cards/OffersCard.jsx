import { Card, Row, Col } from "react-bootstrap";

export default function DriverCard({ name, rating, cost, image }) {
  return (
    <Card className="driverCard ">
      <Row className="align-items-center">
        <Col className="d-flex justify-content-between">
          <div className="driverInfo">
            <img src={image} className="driverImage" alt={name} />
            <div>
              <p className="driverName">{name}</p>
              <div className="rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <i
                    key={index}
                    className={`fa-solid fa-star ${index < rating ? "filled" : "unfilled"}`}
                  ></i>
                ))}
              </div>
            </div>
          </div>
          <p className="price">
            <strong>{cost}</strong> دينار
          </p>
        </Col>

        <Col xs={12} className="buttonGroup">
          <button className="acceptBtn">قبول</button>
          <button className="rejectBtn">رفض</button>
        </Col>
      </Row>
    </Card>
  );
}
