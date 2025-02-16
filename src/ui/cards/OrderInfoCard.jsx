import { Card } from "react-bootstrap";

export default function OrderInfo() {
  return (
    <Card className="orderInfo">
      <div className="order-header">
      <span className="order-category">
  <img src="/images/service1.svg" alt="Electricity Icon" className="category-icon" />
  الكهرباء
</span>
<div className="order-id">
  <p>#555489</p>
  <img src="/icons/code.svg" alt="Order Icon" className="order-icon" />
 
</div>

      </div>

      <p className="order-location">
      <i className="fa-solid fa-location-dot mx-1"></i>
        عمان شارع جامعة الدول

      </p>

      <div className="mapPlaceholder">
        {/* <MapSection /> */}
      </div>

      <div className="imagesRow">
        <img src="" className="orderImage" />
      </div>

      <p className="order-description">
        يوجد عطل مفاجئ في الكهرباء والإضاءة لا تعمل في الليل بالكامل.
      </p>

      <div className="audioSection">
      
      </div>
    </Card>
  );
}
