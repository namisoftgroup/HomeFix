import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function OrderTimeLine({ orderDetails }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="technical_card">
        <div className="technical">
          <div className="content">
            <p>{t("client")}</p>
            <h6>{orderDetails?.client?.name}</h6>
          </div>
        </div>
        <Link
          to={`tel:${
            orderDetails?.client?.country_code + orderDetails?.client?.phone
          }`}
        >
          <img src="/icons/phone-fill.svg" alt="" />
        </Link>
      </div>

      <div className="providerTimeLine">
        <div className="step done">
          <div className="statusLine">
            <div className="icon">
              <img src="/public/icons/check.svg" alt="" />
            </div>
          </div>
          <div className="content">
            <h6 className="title"> تم تقديم عرض سعر   <span className="price"> 500 <small> دينار </small> </span> </h6>
            <p className="dateTime"> <span> 10:24م </span> <span> 20/01/2025 </span> </p>
          </div>
        </div>
        <div className="step">
          <div className="statusLine">
            <div className="icon">
              <img src="/public/icons/wait.svg" alt="" />
            </div>
          </div>
          <div className="content">
            <h6 className="title"> تم تقديم عرض سعر   <span className="price"> 500 <small> دينار </small> </span> </h6>
            <p className="dateTime"> <span> 10:24م </span> <span> 20/01/2025 </span> </p>
          </div>
        </div>
        <div className="step">
          <div className="statusLine">
            <div className="icon">
              <img src="/public/icons/wait.svg" alt="" />
            </div>
          </div>
          <div className="content">
            <h6 className="title"> تم تقديم عرض سعر   <span className="price"> 500 <small> دينار </small> </span> </h6>
            <p className="dateTime"> <span> 10:24م </span> <span> 20/01/2025 </span> </p>
          </div>
        </div>
        <div className="step">
          <div className="statusLine">
            <div className="icon">
              <img src="/public/icons/wait.svg" alt="" />
            </div>
          </div>
          <div className="content">
            <h6 className="title"> تم تقديم عرض سعر   <span className="price"> 500 <small> دينار </small> </span> </h6>
            <p className="dateTime"> <span> 10:24م </span> <span> 20/01/2025 </span> </p>
          </div>
        </div>
      </div>
    </>
  );
}
